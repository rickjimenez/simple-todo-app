import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import NewTodo from './components/NewTodo';
import Todo from './components/Todo';
import useTodos from './hooks/useTodos';

configure({ adapter: new Adapter() });

interface ITodo {
  text: string;
  isCompleted: boolean;
}

interface IuseTodos {
  todos: ITodo[];
  addTodo: (text: string) => void;
  completeTodo: (index: number) => void;
  removeTodo: (index: number) => void;
}

describe('Unit Tests: <App/>', () => {
  describe('Todo', () => {
    it('run completeTodo when click complete btn', () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = { text: 'lol', isCompleted: true };

      const wrapper = shallow(<Todo todo={todo} index={index} completeTodo={completeTodo} removeTodo={removeTodo} />);

      wrapper.find('button').at(0).simulate('click');

      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]);
    });

    it('run removeTodo when click remove btn', () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = { text: 'lol', isCompleted: true };

      const wrapper = shallow(<Todo todo={todo} index={index} completeTodo={completeTodo} removeTodo={removeTodo} />);

      wrapper.find('button').at(1).simulate('click');

      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]);
    });
  });

  describe('New Todo', () => {
    it('call addTodo when form has one value', () => {
      const addTodo = jest.fn();
      const wrapper = shallow(<NewTodo addTodo={addTodo} />);
      wrapper.find('input').simulate('change', { target: { value: 'new todo' } });

      wrapper.find('form').simulate('submit', { preventDefault: () => {} });

      expect(addTodo.mock.calls).toEqual([['new todo']]);
    });
  });

  describe('Custom hook: useTodos', () => {
    const ContainerComp = (props: { hook: () => {} }) => {
      const hook = props.hook();
      return <div {...hook}></div>;
    };

    it('addTodo should add a new task', () => {
      const wrapper = shallow(<ContainerComp hook={useTodos} />);
      let props = wrapper.find('div').props() as IuseTodos;
      props.addTodo('Test text');
      props = wrapper.find('div').props() as IuseTodos;
      expect(props.todos[0].text).toEqual('Test text');
    });

    it('removeTodo should remove a task', () => {
      const wrapper = shallow(<ContainerComp hook={useTodos} />);
      let props = wrapper.find('div').props() as IuseTodos;
      props.removeTodo(1);
      props = wrapper.find('div').props() as IuseTodos;
      expect(props.todos.length).toEqual(2);
    });

    it('completeTodo should set the task status to complete', () => {
      const wrapper = shallow(<ContainerComp hook={useTodos} />);
      let props = wrapper.find('div').props() as IuseTodos;
      props.completeTodo(1);
      props = wrapper.find('div').props() as IuseTodos;
      expect(props.todos[1].isCompleted).toEqual(true);
    });
  });
});

// integration test
describe('Integration Test: <App/>', () => {
  test('if add a new task', () => {
    const newTodoText: string = 'my todo';
    const wrapper = mount(<App />);
    const prevent = jest.fn();
    wrapper.find('input').simulate('change', { target: { value: newTodoText } });
    wrapper.find('form').simulate('submit', { preventDefault: prevent });
    const res = wrapper.find('.todo').at(0).text().includes(newTodoText);

    expect(res).toEqual(true);
    expect(prevent.mock.calls).toEqual([[]]);
  });
});
