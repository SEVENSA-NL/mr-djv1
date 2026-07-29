describe("Structured Data JSON-LD validation", () => {
  const validateSchema = (schema: Record<string, unknown>, expectedSchema: string) => {
    const serialized = JSON.stringify(schema);
    const parsed = JSON.parse(serialized) as Record<string, unknown>;
    const declaredTypes = Array.isArray(parsed["@type"])
      ? parsed["@type"]
      : [parsed["@type"]];

    // Fail closed when JSON serialization drops unsupported values or when the
    // generator emits a non-canonical Schema.org identity.
    expect(parsed).toStrictEqual(schema);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(declaredTypes).toContain(expectedSchema);
    expect(Object.values(parsed).some((value) => value === undefined)).toBe(false);
  };

  it("validates organization schema output", async () => {
    const { generateOrganizationSchema } = await import("../index");
    const schema = generateOrganizationSchema();
    validateSchema(schema, "Organization");
  });

  it("validates local business schema with city data", async () => {
    const { generateLocalBusinessSchema } = await import("../index");
    const schema = generateLocalBusinessSchema({
      city: "Eindhoven",
      province: "Noord-Brabant",
      slug: "eindhoven",
      path: "/dj-in-eindhoven",
    });

    validateSchema(schema, "LocalBusiness");
  });

  it("validates event schema details", async () => {
    const { generateEventSchema } = await import("../index");
    const schema = generateEventSchema({
      name: "Bruiloft DJ Eindhoven",
      description: "All-inclusive bruiloft DJ pakket in Eindhoven",
      city: "Eindhoven",
      province: "Noord-Brabant",
      startDate: "2025-06-01T18:00:00+02:00",
      endDate: "2025-06-02T01:00:00+02:00",
    });

    validateSchema(schema, "Event");
  });

  it("validates service schema output", async () => {
    const { generateServiceSchema } = await import("../index");
    const schema = generateServiceSchema({
      serviceName: "DJ Bruiloft Premium",
      description: "Professionele DJ inclusief licht en geluid voor bruiloften",
      serviceType: "EntertainmentService",
    });

    validateSchema(schema, "Service");
  });
});
