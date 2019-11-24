import { DescriptionList } from '@shopify/polaris';

export default function Description() {
	return (
		<DescriptionList
			items={[
				{
					term: 'App Description',
					description:
						'The app takes a json string and populates it into a spreadsheet table. The cells can be navigated with arrow keys and modified with a double-click or the enter key. Cells support standard excel formulas.',
				},
				{
					term: 'Logic',
					description:
						"The app is managed by a global context object managed by React's useReducer. This context object is wrapped around the entire application. ",
				},
				{
					term: 'Author',
					description: 'Written by Kiril Climson, keiraarts@gmail.com, applying to Branch Labs.',
				},
			]}
		/>
	);
}
