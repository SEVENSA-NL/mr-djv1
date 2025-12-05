import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

describe("HeroSection", () => {
  it("renders the hero section with title and subtitle", () => {
    render(
      <HeroSection
        title="Ervaar de ultieme avond"
        subtitle="Van ceremoniële momenten tot de laatste dans, wij verzorgen het muzikale hoogtepunt."
        ctaPrimaryText="Controleer beschikbaarheid"
      />,
    );

    expect(screen.getByText("Ervaar de ultieme avond")).toBeInTheDocument();
    expect(
      screen.getByText("Van ceremoniële momenten tot de laatste dans, wij verzorgen het muzikale hoogtepunt."),
    ).toBeInTheDocument();
  });

  it("renders primary CTA button", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
      />,
    );

    expect(screen.getByRole("button", { name: "Controleer beschikbaarheid" })).toBeInTheDocument();
  });

  it("renders secondary CTA button when provided", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
        ctaSecondaryText="Vraag een offerte aan"
      />,
    );

    expect(screen.getByRole("button", { name: "Vraag een offerte aan" })).toBeInTheDocument();
  });

  it("does not render secondary CTA when not provided", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
      />,
    );

    expect(screen.queryByRole("button", { name: "Vraag een offerte aan" })).not.toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
      >
        <p>Inclusief licht- en geluidspakket op maat.</p>
      </HeroSection>,
    );

    expect(screen.getByText("Inclusief licht- en geluidspakket op maat.")).toBeInTheDocument();
  });

  it("applies custom background class", () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
        backgroundClass="bg-gradient-to-r from-primary to-secondary"
      />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-r", "from-primary", "to-secondary");
  });

  it("applies custom title and subtitle colors", () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
        titleColor="text-white"
        subtitleColor="text-gray-200"
      />,
    );

    const title = screen.getByText("Test Title");
    const subtitle = screen.getByText("Test Subtitle");

    expect(title).toHaveClass("text-white");
    expect(subtitle).toHaveClass("text-gray-200");
  });

  it("renders background image when provided", () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Controleer beschikbaarheid"
        backgroundImage="/assets/hero-bg.jpg"
        backgroundImageAlt="Hero background image"
      />,
    );

    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Hero background image");
  });

  it("renders with default values", () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
        ctaPrimaryText="Click me"
      />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-neutral-dark");

    const title = screen.getByText("Test Title");
    expect(title).toHaveClass("text-secondary");

    const subtitle = screen.getByText("Test Subtitle");
    expect(subtitle).toHaveClass("text-neutral-light");
  });
});
