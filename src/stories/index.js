import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
  withKnobs,
  text, boolean, number, object,
} from '@kadira/storybook-addon-knobs';
import { action, decorateAction } from '@kadira/storybook-addon-actions';
import Select from 'react-select';
import LazyImage from '../components/LazyImage/LazyImage';
import ZoomOnHoverImage from '../components/ZoomOnHoverImage/ZoomOnHoverImage';
import 'react-select/dist/react-select.css';
import styled, { injectGlobal } from 'styled-components';

const stories = storiesOf('Storybook Knobs', module);
stories.addDecorator(withKnobs);

stories.add('with a button', () => {
  const style = {
    backgroundColor: '#FFF',
    border: '1px solid #DDD',
    borderRadius: 2,
    outline: 0,
    fontSize: 15,
    cursor: 'pointer',
  };

  return (
    <button
      disabled={boolean('Disabled', true)}
      style={object('Style', style)}
    >
      {text('Label', 'Hello Button')}
    </button>
  );
});

stories.add('with some text', () => {
  let content = text('Content', 'This is the content');
  content = content.replace(/\n/g, '<br />');

  return (
    <div
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
});

stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});

stories.add('Select', () => {
  return (
    <Select
      options={[{
        value: 1,
        label: 'One'
      }, {
        value: 2,
        label: 'Two'
      }]}
    />
  );
});

injectGlobal`
  .fullWidth {
     width: 100%;
     display: block;
  }
`;
stories.add('LazyImage', () => {
  return (
    <LazyImage
      className={'fullWidth'}
      onLoadStatusChange={({ loading }) => {
        console.log(loading);
        action('load status change')(loading);
      }}
      src={text('imageSrd', 'http://www.tigerfdn.com/wp-content/uploads/2016/05/How-Much-Does-A-Tiger-Weigh.jpg')}/>
  );
});

stories.add('Hover Image Effect', () => {
  return (
    <div style={{width: '500px'}}>
      <ZoomOnHoverImage
        src="https://ichef.bbci.co.uk/images/ic/960x540/p01wjwl7.jpg"
      />
    </div>
  );
});
