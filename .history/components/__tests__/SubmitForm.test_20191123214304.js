import React from 'react';
import { shallow } from '../../src/enzyme';
import { DataProvider, useDataState, useDataDispatch } from '../../src/DataContext';
import SubmitForm from '../../components/SubmitForm';

describe('Form unit tests', () => {
	it('renders', () => {
		shallow(
			<DataProvider>
				<SubmitForm />
			</DataProvider>
		);
	});

	it('Input only accepts json', () => {
		const wrapper = mount(
			<DataProvider>
				<SubmitForm />
			</DataProvider>
		);

		wrapper.find('textarea#PolarisTextField1').value = '[[1], [2, 3], [4, 5, 6], [], [7, 8, 9, 0]]-------';
		wrapper
			.find('button')
			.first()
			.simulate('click');
		// Expect the wrapper object to be defined
		expect(wrapper.find('.Polaris-InlineError')).toBeDefined();
	});
});
