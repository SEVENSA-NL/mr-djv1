import { z } from "zod";

const contactRequestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10),
  eventDate: z.string().min(1),
  message: z.string().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Invalid content type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();

    // Validate request body
    const result = contactRequestSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: result.error.flatten(),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, phone, eventDate, message } = result.data;

    // TODO: Send to RentGuy CRM API
    // Example integration:
    // await fetch('https://rentguy-api.example.com/leads', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RENTGUY_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     phone,
    //     event_date: eventDate,
    //     message,
    //     source: 'mr-dj.nl contact form',
    //     timestamp: new Date().toISOString()
    //   })
    // });

    // Log for now (until RentGuy integration is complete)
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      eventDate,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email notification
    // TODO: Store in database as backup

    return new Response(
      JSON.stringify({
        success: true,
        message: "We nemen binnen 4 uur contact met je op",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("contact api error", error);
    return new Response(
      JSON.stringify({
        error: "Er is een fout opgetreden. Probeer het later opnieuw.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
