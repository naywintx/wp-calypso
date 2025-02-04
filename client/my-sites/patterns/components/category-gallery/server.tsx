import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { LocalizedLink } from 'calypso/my-sites/patterns/components/localized-link';
import { PatternPreviewPlaceholder } from 'calypso/my-sites/patterns/components/pattern-preview/placeholder';
import { PatternsSection } from 'calypso/my-sites/patterns/components/section';
import { getCategoryUrlPath } from 'calypso/my-sites/patterns/paths';
import { PatternTypeFilter, type CategoryGalleryFC } from 'calypso/my-sites/patterns/types';

import './style.scss';

export const CategoryGalleryServer: CategoryGalleryFC = ( {
	categories,
	description,
	title,
	patternTypeFilter,
} ) => {
	const translate = useTranslate();

	return (
		<PatternsSection title={ title } description={ description }>
			<div
				className={ classNames( 'patterns-category-gallery', {
					'is-regular-patterns': patternTypeFilter === PatternTypeFilter.REGULAR,
					'is-page-patterns': patternTypeFilter === PatternTypeFilter.PAGES,
				} ) }
			>
				{ categories?.map( ( category ) => {
					const patternCount =
						patternTypeFilter === PatternTypeFilter.PAGES
							? category.pagePatternCount
							: category.regularPatternCount;

					return (
						<LocalizedLink
							className="patterns-category-gallery__item"
							href={ getCategoryUrlPath( category.name, patternTypeFilter, false ) }
							key={ category.name }
						>
							<div className="patterns-category-gallery__item-preview">
								<div
									className={ classNames( 'patterns-category-gallery__item-preview', {
										'patterns-category-gallery__item-preview--page-layout':
											patternTypeFilter === PatternTypeFilter.PAGES,
										'patterns-category-gallery__item-preview--mirrored': category.name === 'footer',
									} ) }
								>
									<div className="patterns-category-gallery__item-preview-inner">
										<PatternPreviewPlaceholder
											pattern={
												patternTypeFilter === PatternTypeFilter.PAGES
													? category.pagePreviewPattern
													: category.regularPreviewPattern
											}
										/>
									</div>
								</div>
							</div>

							<div className="patterns-category-gallery__item-name">{ category.label }</div>
							<div className="patterns-category-gallery__item-count">
								{ translate( '%(count)d pattern', '%(count)d patterns', {
									count: patternCount,
									args: { count: patternCount },
								} ) }
							</div>
						</LocalizedLink>
					);
				} ) }
			</div>
		</PatternsSection>
	);
};
