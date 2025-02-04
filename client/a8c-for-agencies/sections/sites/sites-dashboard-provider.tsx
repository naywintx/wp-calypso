import { ReactNode, useEffect, useState } from 'react';
import { SitesViewState } from 'calypso/jetpack-cloud/sections/agency-dashboard/sites-overview/sites-dataviews/interfaces';
import {
	DashboardSortInterface,
	Site,
} from 'calypso/jetpack-cloud/sections/agency-dashboard/sites-overview/types';
import { filtersMap, initialSitesViewState } from './constants';
import SitesDashboardContext from './sites-dashboard-context';

interface Props {
	showOnlyFavoritesInitialState?: boolean;
	hideListingInitialState?: boolean;
	categoryInitialState?: string;
	siteUrlInitialState?: string;
	siteFeatureInitialState?: string;
	searchQuery: string;
	children: ReactNode;
	path: string;
	issueTypes: string;
	currentPage: number;
	sort: DashboardSortInterface;
	featurePreview?: ReactNode | null;
}

const buildFilters = ( { issueTypes }: { issueTypes: string } ) => {
	const issueTypesArray = issueTypes?.split( ',' );

	return (
		issueTypesArray?.map( ( issueType ) => {
			return {
				field: 'status',
				operator: 'in',
				value: filtersMap.find( ( filterMap ) => filterMap.filterType === issueType )?.ref || 1,
			};
		} ) || []
	);
};

export const SitesDashboardProvider = ( {
	hideListingInitialState = false,
	showOnlyFavoritesInitialState = false,
	categoryInitialState,
	siteUrlInitialState,
	siteFeatureInitialState,
	children,
	path,
	searchQuery,
	issueTypes,
	currentPage,
	sort,
	featurePreview,
}: Props ) => {
	const [ hideListing, setHideListing ] = useState( hideListingInitialState );
	const [ selectedCategory, setSelectedCategory ] = useState( categoryInitialState );
	const [ selectedSiteFeature, setSelectedSiteFeature ] = useState( siteFeatureInitialState );
	const [ showOnlyFavorites, setShowOnlyFavorites ] = useState( showOnlyFavoritesInitialState );
	const [ isBulkManagementActive, setIsBulkManagementActive ] = useState( false );
	const [ selectedSites, setSelectedSites ] = useState< Site[] >( [] );
	const [ currentLicenseInfo, setCurrentLicenseInfo ] = useState< string | null >( null );
	const [ mostRecentConnectedSite, setMostRecentConnectedSite ] = useState< string | null >( null );
	const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );
	const [ initialSelectedSiteUrl, setInitialSelectedSiteUrl ] = useState( siteUrlInitialState );

	const handleSetBulkManagementActive = ( isActive: boolean ) => {
		setIsBulkManagementActive( isActive );
		if ( ! isActive ) {
			setSelectedSites( [] );
		}
	};

	const onShowLicenseInfo = ( license: string ) => {
		setCurrentLicenseInfo( license );
	};

	const onHideLicenseInfo = () => {
		setCurrentLicenseInfo( null );
	};

	const [ sitesViewState, setSitesViewState ] = useState< SitesViewState >( {
		...initialSitesViewState,
		page: currentPage,
		search: searchQuery,
		sort,
		filters: buildFilters( { issueTypes } ),
	} );

	useEffect( () => {
		setInitialSelectedSiteUrl( siteUrlInitialState );
		if ( ! siteUrlInitialState ) {
			setShowOnlyFavorites( showOnlyFavoritesInitialState );
			setHideListing( false );
		}

		setSitesViewState( ( previousState ) => ( {
			...previousState,
			...( siteUrlInitialState
				? {}
				: {
						filters: buildFilters( { issueTypes } ),
				  } ),
			...( siteUrlInitialState ? {} : { search: searchQuery } ),
			...( siteUrlInitialState ? {} : { sort } ),
			...( siteUrlInitialState ? {} : { selectedSite: undefined } ),
			...( siteUrlInitialState ? {} : { type: 'table' } ),
		} ) );
	}, [
		setSitesViewState,
		showOnlyFavoritesInitialState,
		searchQuery,
		sort,
		issueTypes,
		siteUrlInitialState,
		setInitialSelectedSiteUrl,
	] );

	const sitesDashboardContextValue = {
		selectedCategory: selectedCategory,
		setSelectedCategory: setSelectedCategory,
		selectedSiteFeature: selectedSiteFeature,
		setSelectedSiteFeature: setSelectedSiteFeature,
		hideListing: hideListing,
		setHideListing: setHideListing,
		showOnlyFavorites: showOnlyFavorites,
		setShowOnlyFavorites: setShowOnlyFavorites,
		path,
		currentPage,
		isBulkManagementActive,
		initialSelectedSiteUrl: initialSelectedSiteUrl,
		setIsBulkManagementActive: handleSetBulkManagementActive,
		selectedSites,
		setSelectedSites,
		currentLicenseInfo,
		showLicenseInfo: onShowLicenseInfo,
		hideLicenseInfo: onHideLicenseInfo,
		mostRecentConnectedSite,
		setMostRecentConnectedSite,
		isPopoverOpen,
		setIsPopoverOpen,
		sitesViewState,
		setSitesViewState,
		featurePreview,
	};
	return (
		<SitesDashboardContext.Provider value={ sitesDashboardContextValue }>
			{ children }
		</SitesDashboardContext.Provider>
	);
};
