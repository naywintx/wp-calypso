import { SitesViewState } from 'calypso/jetpack-cloud/sections/agency-dashboard/sites-overview/sites-dataviews/interfaces';
import { JETPACK_BOOST_ID } from './features/features';
import { AgencyDashboardFilterMap } from './types';

export const A4A_SITES_DASHBOARD_DEFAULT_CATEGORY = 'overview';
export const A4A_SITES_DASHBOARD_DEFAULT_FEATURE = JETPACK_BOOST_ID;

export const DEFAULT_SORT_FIELD = 'url';
export const DEFAULT_SORT_DIRECTION = 'asc';

export const filtersMap: AgencyDashboardFilterMap[] = [
	{ filterType: 'all_issues', ref: 1 },
	{ filterType: 'backup_failed', ref: 2 },
	{ filterType: 'backup_warning', ref: 3 },
	{ filterType: 'threats_found', ref: 4 },
	{ filterType: 'site_disconnected', ref: 5 },
	{ filterType: 'site_down', ref: 6 },
	{ filterType: 'plugin_updates', ref: 7 },
];

export const initialSitesViewState: SitesViewState = {
	type: 'table',
	perPage: 50,
	page: 1,
	sort: {
		field: DEFAULT_SORT_FIELD,
		direction: DEFAULT_SORT_DIRECTION,
	},
	search: '',
	filters: [],
	hiddenFields: [ 'status' ],
	layout: {},
	selectedSite: undefined,
};
