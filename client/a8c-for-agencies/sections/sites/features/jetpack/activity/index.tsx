import ActivityLogV2 from 'calypso/my-sites/activity/activity-log-v2';
import { useDispatch } from 'calypso/state';
import { setSelectedSiteId } from 'calypso/state/ui/actions';
import SitePreviewPaneContent from '../../../site-preview-pane/site-preview-pane-content';

import 'calypso/my-sites/activity/activity-log-v2/style.scss';
import './style.scss';

type Props = {
	siteId: number;
};

export function JetpackActivityPreview( { siteId }: Props ) {
	const dispatch = useDispatch();

	if ( siteId ) {
		dispatch( setSelectedSiteId( siteId ) );
	}
	return (
		<SitePreviewPaneContent>
			<ActivityLogV2 />
		</SitePreviewPaneContent>
	);
}
