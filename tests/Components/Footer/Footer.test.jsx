import { render, screen } from "@testing-library/react";
import Footer from "../../../src/Components/Footer/Footer";

describe("Pruebas en <Footer />", () => {
  test("debe mostrar el componente correctamente", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    const yearElement = screen.getByText(`Copyright ${year} page by Marko Web`);

    expect(screen.getByTestId("hr")).toHaveClass(
      "h-px w-4/5 bg-gray-400 opacity-50 outline-none border-none"
    );
    expect(screen.getByAltText("logo")).toHaveAttribute(
      "src",
      "[object Undefined]"
    );
    expect(yearElement).toBeInTheDocument();
  });
});
