import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Install } from "@/components/Install";
import { Nav } from "@/components/Nav";
import { Preview } from "@/components/Preview";
import { siteConfig } from "@/lib/utils";
import { getDownloadLinks, getLatestVersion } from "@/lib/version";

// Single-responsibility: landing-page composition. The actual UI work lives
// in the section components. This file just stacks them in reading order.
export default async function HomePage() {
  const [version, links] = await Promise.all([
    getLatestVersion(),
    getDownloadLinks(),
  ]);

  // SoftwareApplication structured data so search engines can render rich
  // results (price, OS support, version). Built from the live release
  // metadata so it never drifts from the rendered version.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    softwareVersion: version,
    downloadUrl: `${siteConfig.github}/releases/latest`,
    license: `${siteConfig.github}/blob/main/LICENSE`,
    author: {
      "@type": "Person",
      name: "Avijit Dey",
      url: "https://github.com/Avijit07x",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: undefined, // intentionally absent — populate when reviews exist
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data is server-rendered, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav links={links} version={version} />
      <main>
        <Hero version={version} links={links} />
        <Features />
        <Preview />
        <Install links={links} version={version} />
      </main>
      <Footer />
    </>
  );
}
