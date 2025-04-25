import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log("Connection Successful!", result);
  } catch (error) {
    console.error("❌ Connection Failed:", error);
  } finally {
    await sql.end();
  }
}

testConnection();