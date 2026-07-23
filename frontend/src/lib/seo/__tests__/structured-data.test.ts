describe("Structured Data JSON-LD validation", () => {
  const requiredPaths: Record<string, string[]> = {
    Organization: ["name", "url", "logo", "telephone", "address.addressCountry"],
    LocalBusiness: [
      "name",
      "url",
      "address.addressLocality",
      "address.addressRegion",
      "areaServed.name",
    ],
    Event: [
      "name",
      "description",
      "startDate",
      "endDate",
      "location.address.addressLocality",
      "organizer.name",
    ],
    Service: [
      "name",
      "description",
      "serviceType",
      "provider.name",
      "offers.priceSpecification.priceCurrency",
    ],
  };

  const valueAtPath = (value: Record<string, unknown>, path: string) =>
    path.split(".").reduce<unknown>((current, segment) => {
      if (!current || typeof current !== "object" || Array.isArray(current)) {
        return undefined;
      }
      return (current as Record<string, unknown>)[segment];
    }, value);

  const validateSchema = async (schema: Record<string, unknown>, expectedSchema: string) => {
    const serialized = JSON.stringify(schema);
    expect(() => JSON.parse(serialized)).not.toThrow();
    expect(JSON.parse(serialized)).toEqual(schema);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe(expectedSchema);

    for (const path of requiredPaths[expectedSchema] ?? []) {
      const value = valueAtPath(schema, path);
      expect(value, `${expectedSchema}.${path} must be populated`).not.toBeUndefined();
      expect(value, `${expectedSchema}.${path} must be populated`).not.toBeNull();
      expect(value, `${expectedSchema}.${path} must be populated`).not.toBe("");
    }
  };

  it("validates organization schema output", async () => {
    const { generateOrganizationSchema } = await import("../index");
    const schema = generateOrganizationSchema();
    await validateSchema(schema, "Organization");
  });

  it("validates local business schema with city data", async () => {
    const { generateLocalBusinessSchema } = await import("../index");
    const schema = generateLocalBusinessSchema({
      city: "Eindhoven",
      province: "Noord-Brabant",
      slug: "eindhoven",
      path: "/dj-in-eindhoven",
    });

    await validateSchema(schema, "LocalBusiness");
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

    await validateSchema(schema, "Event");
  });

  it("validates service schema output", async () => {
    const { generateServiceSchema } = await import("../index");
    const schema = generateServiceSchema({
      serviceName: "DJ Bruiloft Premium",
      description: "Professionele DJ inclusief licht en geluid voor bruiloften",
      serviceType: "EntertainmentService",
    });

    await validateSchema(schema, "Service");
  });
});
