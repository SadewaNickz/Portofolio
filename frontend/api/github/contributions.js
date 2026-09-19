// frontend/api/github/contributions.js
// Vercel Serverless Function — proxy ke GitHub GraphQL API
import axios from "axios";

// Simple in-memory cache (5 menit)
let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 5 * 60 * 1000;

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const now = Date.now();

    // Cek cache
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return res.status(200).json(cache.data);
    }

    const username = process.env.GITHUB_USERNAME || "SadewaNickz";
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "GitHub token belum dikonfigurasi di server.",
      });
    }

    const response = await axios.post(
      GITHUB_GRAPHQL,
      {
        query: CONTRIBUTION_QUERY,
        variables: { username },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      console.error("GitHub GraphQL errors:", response.data.errors);
      return res.status(502).json({ error: "Gagal mengambil data dari GitHub." });
    }

    const calendar =
      response.data.data.user.contributionsCollection.contributionCalendar;

    // Hitung statistik tambahan
    const allDays = calendar.weeks.flatMap((w) => w.contributionDays);

    // Current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split("T")[0];
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].date === today && allDays[i].contributionCount === 0) {
        continue;
      }
      if (allDays[i].contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    // Hari paling aktif
    const busiest = allDays.reduce(
      (max, day) =>
        day.contributionCount > max.contributionCount ? day : max,
      allDays[0]
    );

    const result = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      stats: {
        currentStreak,
        longestStreak,
        busiestDay: {
          date: busiest.date,
          count: busiest.contributionCount,
        },
      },
    };

    // Simpan ke cache
    cache = { data: result, timestamp: now };

    res.status(200).json(result);
  } catch (error) {
    console.error("GitHub API error:", error.message);
    res.status(500).json({ error: "Gagal mengambil data kontribusi GitHub." });
  }
}
