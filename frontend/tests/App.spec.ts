import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

test('renders title', () => {
  const wrapper = mount(App);
  expect(wrapper.text()).toContain('Todos');
});
