import connectDB from "@/connection/db";

export async function GET(){
    try {
        await connectDB();
        return new Response(JSON.stringify({ message: 'Database connected successfully' }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Database connection failed', error: error.message }), {
            status: 500,
          });
    }
}