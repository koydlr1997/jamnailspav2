import { landingContent } from "./landing";
export const servicesPath = (category: string) => `${import.meta.env.BASE_URL}services/${category.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
export const subcategoriesFor = (category: string) => category === "NAIL SERVICES" ? landingContent.nailSubcategories : category === "HAND & FOOT" ? landingContent.handFootSubcategories : category === "BODY MASSAGE" ? landingContent.bodyMassageSubcategories : category === "LASH & BROW" ? landingContent.lashBrowSubcategories : category === "WAXING" ? landingContent.waxingSubcategories : [];
export const subcategoryPath = (category: string, label: string) => `${servicesPath(category)}/${label.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
export function readServiceRoute() {
  const path = window.location.pathname.replace(/\/$/, "");
  const category = landingContent.serviceCategories.find((item) => path === servicesPath(item) || subcategoriesFor(item).some((label) => path === subcategoryPath(item, label)));
  const nail = category ? subcategoriesFor(category).find((label) => path === subcategoryPath(category, label)) : undefined;
  return { active: Boolean(category) || path === `${import.meta.env.BASE_URL}services`, category: category ?? landingContent.serviceCategories[0], nail: nail ?? "" };
}
