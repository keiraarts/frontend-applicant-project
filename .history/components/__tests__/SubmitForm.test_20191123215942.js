import React from 'react';
import { Button, InlineError } from '@shopify/polaris';
import { shallow, mount } from '../../src/enzyme';
import { mountWithAppProvider } from './utils/enzyme';
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
		const wrapper = mountWithAppProvider(
			<DataProvider>
				<SubmitForm />
			</DataProvider>
		);

		const data = wrapper
			.find(Button)
			.first()
			.simulate('click');

		console.log('data', data);
		// Expect the wrapper object to be defined
		expect(wrapper.find(InlineError).exists()).toBe(true);
	});
});
