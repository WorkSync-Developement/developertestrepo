import ModernHeaderBar from 'components/layout/ModernHeaderBar';
import { getClientData } from '@/lib/client';
import { getFeatures, isMultiLocation, getAllWebsites } from '@/lib/website';
import { getThemeSettings } from '@/lib/theme';

interface HeaderShellProps {
	locationPrefix?: string;
}

export default async function HeaderShell({ locationPrefix }: HeaderShellProps) {
	// Extract slug from locationPrefix (e.g., "/locations/houston" -> "houston")
	const slug = locationPrefix?.startsWith('/locations/') 
		? locationPrefix.replace('/locations/', '') 
		: undefined;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [clientData, features, theme, isMultiLoc, locations] = await Promise.all([
		getClientData(),
		getFeatures(slug),
		getThemeSettings(),
		isMultiLocation(),
		getAllWebsites()
	]);

	// Get website name from client_website or clients table
	const websiteName = clientData?.agency_name || "Lehmann Agency";

	// Merge isMultiLoc into features so HeaderBar gets the correct multi-location state
	const mergedFeatures = features 
		? { ...features, multi_location: isMultiLoc }
		: { multi_location: isMultiLoc };

	// Force logo.png as fallback if no logo URL from theme
	const finalLogoUrl = theme?.website_logo_url || '/logo.png';

	return (
		<ModernHeaderBar
			websiteName={websiteName}
			phone={clientData?.phone}
			locationPrefix={locationPrefix}
			logoUrl={finalLogoUrl}
			showSiteName={false}
			features={mergedFeatures}
			navbarSettings={theme?.navbar_settings}
			ctaSettings={theme?.cta_settings}
			locations={isMultiLoc ? locations : undefined}
		/>
	);
}
