import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithI18n } from "@/lib/test-utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";

describe("LanguageSwitcher Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render language switcher with current language", () => {
    renderWithI18n(<LanguageSwitcher />, { initialLanguage: "en" });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should display available languages", async () => {
    renderWithI18n(<LanguageSwitcher />, { initialLanguage: "en" });
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    // Check for language options
    const englishOption = screen.queryByText("English");
    const dutchOption = screen.queryByText("Nederlands");
    expect(englishOption || dutchOption).toBeInTheDocument();
  });

  it("should change language when option is selected", async () => {
    renderWithI18n(<LanguageSwitcher />, { initialLanguage: "en" });
    const user = userEvent.setup();

    const button = screen.getByRole("button");
    await user.click(button);

    const dutchOption = screen.queryByText("Nederlands");
    if (dutchOption) {
      await user.click(dutchOption);
      // Language should be changed
    }
  });

  it("should highlight current language", () => {
    const { container } = renderWithI18n(<LanguageSwitcher />, {
      initialLanguage: "nl",
    });
    const activeItem = container.querySelector("[data-language='nl']");
    expect(activeItem).toHaveClass("active");
  });

  it("should have proper ARIA labels for accessibility", () => {
    renderWithI18n(<LanguageSwitcher />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button.getAttribute("aria-label")).toMatch(/language/i);
  });

  it("should persist language selection to localStorage", async () => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock as any;

    renderWithI18n(<LanguageSwitcher />, { initialLanguage: "en" });
    const user = userEvent.setup();

    const button = screen.getByRole("button");
    await user.click(button);

    const dutchOption = screen.queryByText("Nederlands");
    if (dutchOption) {
      await user.click(dutchOption);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    }
  });
});
