import { Link } from "react-router-dom";
import { navLinks } from "../Header/navLinks";
import { sectionLinks } from "./sectionLinks";
import { SectionLink } from "./SectionLink";

export function Footer() {

	return (
		<footer className="bg-surface-06 text-white">
			<div className="w-full laptop:max-w-[1280px] desktop:max-w-[1600px] mx-auto px-4 laptop:px-0">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-12.5   pt-20 pb-10">
					{navLinks.map((navLink) => {
						const sections = sectionLinks[navLink.to] ?? [];

						return (
							<div key={navLink.to}>
								<Link to={navLink.to} className="text-white text-lg font-semibold inline-block mb-5">{navLink.label}</Link>

								{sections.length > 0 && (
									<div className="flex flex-col text-neutral-60 text-base font-medium gap-2.5">
										{sections.map((section) => (
											<SectionLink
												key={section.id}
												to={navLink.to}
												id={section.id}
												label={section.label} />
										))}
									</div>
								)}
							</div>
						)
					})}
					<div>
						<p>Connect With Us</p>
						<div>
							<div>twitter</div>
							<div>facebook</div>
							<div>linkedin</div>
						</div>
					</div>
				</div>

				<div className="py-5 border-t border-surface-15 text-neutral-60">
					<div className="flex flex-col sm:flex-row sm:justify-between gap-5">
						<p>© CineVault. All Right Reserved</p>
						{/**Можно вынести в отдельный legalLinks и там через React.fragment вставлять эти span */}
						<div className="flex flex-row gap-4 items-center" >
							<Link to="/terms" className="">Terms of Use</Link>
							<span className="h-full w-px bg-surface-12" aria-hidden="true" />
							<Link to="/privacy" className="">Privacy Policy</Link>
							<span className="h-full w-px bg-surface-12" aria-hidden="true" />
							<Link to="/cookies" className="">Cookie Policy</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}