import { landingContent, type ServiceItem } from "../../../data/landing";
import { subcategoriesFor } from "../../../data/service-routes";

function groupServices(services: ServiceItem[]) {
  return services.reduce<ServiceItem[][]>((groups, service) => {
    if (!groups.length || service.newGroup) groups.push([]);
    groups[groups.length - 1].push(service);
    return groups;
  }, []);
}

export function Services({ active, selectedCategory, onCategoryChange, selectedNail, onNailChange }: { active: boolean; selectedCategory: string; onCategoryChange: (category: string) => void; selectedNail: string; onNailChange: (nail: string) => void }) {
  return (
    <section
      id="services-panel"
      aria-label="Services"
      aria-hidden={!active}
      inert={!active}
      className={`services-panel fixed inset-x-0 top-0 z-10 h-screen overflow-hidden bg-services ${active ? "services-panel-active" : "pointer-events-none"}`}
    >
      <div className="absolute left-0 top-0 h-services-top w-full overflow-hidden md:h-full md:w-services-names">
        <div className="services-names-panel absolute inset-0 overflow-x-hidden overflow-y-auto bg-surface px-navbar font-passion text-service-category font-bold leading-[0.75] tracking-hero-title text-ink md:px-navbar-tablet md:text-service-category-tablet md:leading-none xl:px-navbar-desktop xl:text-service-category-desktop">
          <div className="flex min-h-full flex-col items-start justify-start gap-1 pt-navbar-height pb-navbar-height md:pt-services-label-tablet">
          {landingContent.serviceCategories.map((category, index) => (
            <div key={category} className="w-full shrink-0">
            <button
              type="button"
              aria-expanded={selectedCategory === category}
              aria-controls={`category-services-${index}`}
              onClick={() => onCategoryChange(category)}
              className={`service-category-button w-full min-w-0 shrink-0 cursor-pointer text-left transition-colors duration-200 motion-reduce:transition-none ${selectedCategory === category ? "text-service-active" : "text-service-inactive"}`}
            >
              <span className="block origin-center scale-y-[1.35] md:scale-y-[1.265]">
                <span className={`block origin-left transition-transform duration-300 ease-in-out motion-reduce:transition-none ${selectedCategory === category ? "scale-120" : "scale-100"}`}>
                  {category}
                </span>
              </span>
            </button>
            <div
              id={`category-services-${index}`}
              inert={selectedCategory !== category}
              aria-hidden={selectedCategory !== category}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${selectedCategory === category ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                {subcategoriesFor(category).length > 0 && (
                  <div className="flex flex-col items-start gap-1 py-4 pl-4 text-service-subcategory md:text-service-subcategory-tablet xl:text-service-subcategory-desktop">
                    {subcategoriesFor(category).map((label) => (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={selectedNail === label}
                        onClick={() => onNailChange(label)}
                        className={`service-category-button w-full cursor-pointer text-left transition-colors duration-200 motion-reduce:transition-none ${selectedNail === label ? "text-subcategory-active" : "text-subcategory-inactive"}`}
                      >
                        <span className="block scale-y-[1.35] md:scale-y-[1.265]">
                          <span className={`block origin-left transition-transform duration-300 ease-in-out motion-reduce:transition-none ${selectedNail === label ? "scale-120" : "scale-100"}`}>{label}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {(landingContent.servicesByCategory[category]?.length ?? 0) > 0 && (
                <div className="flex items-start gap-service-groups pt-3 pb-6 pl-4 font-oswald text-base font-normal leading-normal tracking-normal text-ink">
                  {[0, 2].map((start) => groupServices(landingContent.servicesByCategory[category] ?? []).slice(start, start + 2)).filter((column) => column.length).map((column) => (
                  <div key={column[0][0].name} className="grid min-w-0 grid-cols-[minmax(0,max-content)_max-content] content-start gap-x-service-price gap-y-6">
                  {column.map((group) => (
                  <ul key={group[0].name} className="col-span-2 grid min-w-0 grid-cols-subgrid content-start gap-y-1">
                  {group.map((service) => (
                    <li key={service.name} className="col-span-2 grid grid-cols-subgrid">
                      <div className="col-span-2 grid grid-cols-subgrid items-baseline leading-tight">
                        <span className="text-lg font-bold uppercase">{service.name}</span>
                        <span className="text-lg text-right font-bold tabular-nums">{service.price.toFixed(2)}</span>
                      </div>
                      {service.note && <p className="col-span-2 text-base leading-service-note italic">{service.note}</p>}
                      {service.singleNailPrice !== undefined && (
                        <p className="col-span-2 text-base leading-service-note">Single nail: <span className="font-bold">{service.singleNailPrice.toFixed(2)}</span></p>
                      )}
                    </li>
                  ))}
                  </ul>
                  ))}
                  </div>
                  ))}
                </div>
                )}
              </div>
            </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
