import "@testing-library/jest-dom/vitest";
import { expect, afterEach, vi, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Suppress JSDOM navigation warnings
const originalError = console.error;
beforeEach(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Not implemented: navigation")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  console.error = originalError;
});

// Mock window.location for navigation handling
const mockLocation = {
  href: "http://localhost:3000/",
  hash: "",
  host: "localhost:3000",
  hostname: "localhost",
  origin: "http://localhost:3000",
  pathname: "/",
  port: "3000",
  protocol: "http:",
  search: "",
  assign: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
};

Object.defineProperty(window, "location", {
  writable: true,
  value: mockLocation,
  configurable: true,
});

// Mock HTMLAnchorElement navigation
const originalHref = Object.getOwnPropertyDescriptor(
  HTMLAnchorElement.prototype,
  "href"
);

Object.defineProperty(HTMLAnchorElement.prototype, "href", {
  get(this: HTMLAnchorElement) {
    return this.getAttribute("href") || "";
  },
  set(this: HTMLAnchorElement, value: string) {
    this.setAttribute("href", value);
  },
  configurable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock as any;

// Mock Touch events
class TouchImpl implements Touch {
  clientX: number = 0;
  clientY: number = 0;
  screenX: number = 0;
  screenY: number = 0;
  pageX: number = 0;
  pageY: number = 0;
  radiusX: number = 0;
  radiusY: number = 0;
  rotationAngle: number = 0;
  force: number = 0;
  target: EventTarget;
  identifier: number;

  constructor(
    target: EventTarget,
    identifier: number = 0,
    clientX: number = 0,
    clientY: number = 0
  ) {
    this.target = target;
    this.identifier = identifier;
    this.clientX = clientX;
    this.clientY = clientY;
    this.pageX = clientX;
    this.pageY = clientY;
  }
}

(global as any).Touch = TouchImpl;

// Mock TouchList
class TouchListImpl extends Array {
  item(index: number) {
    return this[index] || null;
  }
}

(global as any).TouchList = TouchListImpl;

// Mock TouchEvent
class TouchEventImpl extends Event {
  touches: any[] = [];
  targetTouches: any[] = [];
  changedTouches: any[] = [];
  altKey: boolean = false;
  ctrlKey: boolean = false;
  metaKey: boolean = false;
  shiftKey: boolean = false;

  constructor(type: string, init?: any) {
    super(type, init);
    this.touches = init?.touches || [];
    this.targetTouches = init?.targetTouches || [];
    this.changedTouches = init?.changedTouches || [];
  }
}

(global as any).TouchEvent = TouchEventImpl;

// Mock Canvas.toDataURL
HTMLCanvasElement.prototype.toDataURL = function () {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
};

// Mock getComputedStyle to provide better defaults for tests
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = function (element: Element) {
  const style = originalGetComputedStyle(element);

  // Override methods to return more realistic values for tests
  const handler = {
    get(target: CSSStyleDeclaration, prop: string) {
      const value = target[prop as any];

      // For font-size, return a default value if empty
      if (prop === 'fontSize' && (!value || value === '')) {
        return '16px';
      }

      // For line-height, return a default value if empty
      if (prop === 'lineHeight' && (!value || value === '')) {
        return '1.5';
      }

      // For font-weight, return a default value if empty
      if (prop === 'fontWeight' && (!value || value === '')) {
        return '400';
      }

      return value;
    },
  };

  return new Proxy(style, handler) as any;
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock PerformanceObserver
global.PerformanceObserver = class PerformanceObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
