# react-config-form

<img width="944" alt="image" src="https://user-images.githubusercontent.com/52678249/177845405-f4292487-db1a-4223-b8a1-fafb1826a6a1.png">

A lightweight form builder package for creating highly customizable and accessible forms in React just with a config. The component removes all necessity to write long boilterplate for handling state, change & errors for any React form. Just pass in a **config**, and attach a **form submit handler**, and you're done! Comes with the power of [TypeScript](https://www.typescriptlang.org/).

[**Visit the site**](https://react-config-form.vercel.app)

## Features

- Render a form with just a config of all the fields needed in the form, with their `label` and `initialValue`.
- Ability to add custom header and footer elements _(including the Submit button, don't forget it!)_ for the form.
- Ability to handle form submission, by passing an `onSubmit` callback prop. The callback receives the form state _(an object of form labels as keys and the input value as values)_ as an argument.
- High customizability:
  - Custom **form, form container, inputs, labels, form groups**(a group contains the label & input for a form element) & **form sections**.
  - Custom input sizes [small | medium (default) | large]
  - Customize by passing `className` or/and `styles` as props
  - **Customize all forms on your app globally** using global classnames, or
  - **Customize each form differently** using props for individual forms.
- Error handling on form level & input level for inputs which are `required` to be filled.
- Fully keyboard accessible & responsive.
- A built in `SubmitButton` component for providing a custom form submit button easily.

## Getting Started

Install the package using:

```bash
# with npm
npm install --save react-config-form
# with yarn
yarn add react-config-form
```

## Usage

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import {
  FormBuilder,
  SubmitButton
  FormInputConfig,
  FormSubmitState,
} from "react-config-form";
// This stylesheet contains the default styling for the form
import 'react-config-form/dist/react-config-form.cjs.development.css';

const LoginForm = () => {
  const loginFormConfig: FormInputConfig[] = [
    {
      label: "Username",
      initialValue: "",
      type: "text",
      required: true,
    },
    {
      label: "Password",
      initialValue: "",
      type: "password",
      required: true,
    }
  ];

  const handleLoginFormSubmit = (form: FormSubmitState) => {
    console.log(form);
  };

  return (
      <FormBuilder
        config={loginFormConfig}
        formStyles={{
          backgroundColor: "#4cd8d3",
          border: "1px solid #1e014a",
        }}
        formHeader={
          <header>
            <h1>Login</h1>
          </header>
        }
        onSubmit={handleLoginFormSubmit}
      >
        <SubmitButton text="Login" />
      </FormBuilder>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<LoginForm/>);
```

### Styling the form

You can customize the styles for a form in multiple ways:

#### 1. Default styles

You can choose to use the minimal default styles that come with this package, hence writing less css for your forms. _(One goal of this package is to make you write less code for your forms!)_. Just include this line in your form component:

```jsx
import 'react-config-form/dist/react-config-form.cjs.development.css';
```

#### 2. Use your own styles together with default styles

Most times, you'll probably want to use custom styles for your form, but **not start from scratch** _([like these examples](https://formbuildr.vercel.app/examples))_. You can use both, the default styles and your custom styles, overriding some default styles through the [config](#config), [props](#form-props) or [global classnames](#global-classnames). _Global classnames are especially useful for re-using same styles for multiple or all forms across your app._

```jsx
// Import stylesheets in this order
import 'react-config-form/dist/react-config-form.cjs.development.css';
import 'path-to-your-custom-css-1';
import 'path-to-your-custom-css-2';
// ... and so on.
```

**The ordering of the imports are important since you want to override the default styles with the custom ones.**

#### 3. Custom styles

If you just want to use your custom styles, you can create your own styles for a form through the [global classnames](#global-classnames) or by passing in custom classnames through the [config](#config) or [props](#form-props). **No need to import the default css.**

## Playground

There is a [Parcel-based](https://parceljs.org) playground for an example form inside `/example`. You can run the playground locally using these commands:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, due to [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

**For seeing the more example forms demo, please check the [website](https://formbuildr.vercel.app/examples).**

## Deploying the Example Playground

The Playground is just a simple [Parcel](https://parceljs.org) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Props

### <a name="form-props"></a>FormBuilder props

_Required props are marked with an asterisk(\*)_

|      Prop       |     Type      | Description                                                                                                  |
| :-------------: | :-----------: | ------------------------------------------------------------------------------------------------------------ |
|    config\*     |    `Array`    | An array of config objects for all form input fields.                                                        |
|   onSubmit\*    |  `Function`   | A callback function that takes the form state as an <br>argument and gets called when the form is submitted. |
|   formHeader    | `JSX Element` | A JSX Element that gets rendered above the actual form.                                                      |
|    formClass    |   `string`    | A string that includes class(es) to be attached with<br>the form.                                            |
|   formStyles    |   `Object`    | A style object that includes styles for the form.                                                            |
| containerClass  |   `string`    | A string that includes class(es) to be attached with<br>the form container.                                  |
| containerStyles |   `Object`    | A style object that includes styles for the <br>form container.                                              |
|    children     |  `ReactNode`  | React Elements (like a Submit button) that gets rendered <br>beneath the form body (all the form fields).    |

### SubmitButton props

|    Prop     |            Type(s)            | Description                                                                       |
| :---------: | :---------------------------: | --------------------------------------------------------------------------------- |
|    text     |           `string`            | The button text <br>[By default, it'll show a 'Submit' text]                      |
|  position   | `left`<br>`middle`<br>`right` | The alignment for the submit button.<br>[By default, it'll show up in the middle] |
| submitClass |           `string`            | A string that includes class(es) <br>to be attached with the submit button.       |

## Types

### <a name="config"></a> Config type

Each form input config object contains the following:

_Required properties are marked with an asterisk(\*)_

|   Property   |                    Type(s)                    | Description                                                                                                                                                                                                            |
| :----------: | :-------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   label\*    |                   `string`                    | The label for the input. The label is used as a key for <br>storing values in the form state on submission.                                                                                                            |
|    type\*    | all input types<br> `textarea`<br> `dropdown` | The type for the input. (Like - "text", "email" etc).<br>There are two custom types as of now - "textarea" & "dropdown".<br>[**All input types are not tested, some input types may show <br>unexpected behaviours.**] |
| initialValue |                As per the type                | The initialValue for the input. [Not required for types like <br>"file" & "dropdown".]                                                                                                                                 |
|   required   |                   `boolean`                   | Boolean denoting whether a value is required for the input.                                                                                                                                                            |
|   options    |                    `Array`                    | A list of options for the input. Required for selective inputs<br>like "dropdown" or "radio".                                                                                                                          |
|   checked    |                   `boolean`                   | Boolean denoting the condition when a field should be <br>checked/filled. [Useful for "checkbox"/"radio" type inputs.]                                                                                                 |
|     size     |       `small` <br>`medium` <br>`large`        | Specifies the size of the input. [Default value - "medium"].                                                                                                                                                           |
| placeholder  |                   `string`                    | A placeholder for the input.                                                                                                                                                                                           |
|   onChange   |                  `Function`                   | A callback for that gets called with the current input value<br>whenever the input is changed. [Avoid using it for managing state <br>for the form to avoid multiple sources of truth.]                                |
|  className   |                   `string`                    | A string that includes class(es) to be attached with the input.                                                                                                                                                        |
|    styles    |                   `Object`                    | A style object that includes styles for the input.                                                                                                                                                                     |
|  labelClass  |                   `string`                    | A string that includes class(es) to be attached with the label.                                                                                                                                                        |
|  groupClass  |                   `string`                    | A string that includes class(es) to be attached with the form group <br/>(label and input box).                                                                                                                        |
| groupHeader  |                 `JSX Element`                 | A header element for a particular form group. <br/>[**This effectively makes dividing a form into multiple sections possible**].                                                                                       |
| groupFooter  |                 `JSX Element`                 | A footer element for a particular form group.                                                                                                                                                                          |

## <a name="global-classnames"></a>Global classNames

Global classNames can be used inside your project to **style all forms globally across your app**. If you have a lot of forms, and want to apply common styles to each form, this will be much faster as opposed to having to add props for each form individually.
Here goes the list of global classnames:

|     Classname     |                                                                Element                                                                |
| :---------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
|       form        |                                                         The main form element                                                         |
|  form-container   |                                                          The form container                                                           |
|    form-group     |                       Each form group (A form group consists of <br>the label & the input for each form field)                        |
| form-group-{type} | A dynamic classname for form group of a <br>particular input type. [For example, <br>this will be `form-group-text` for a text input] |
|    form-label     |                                                 Each label for all inputs in the form                                                 |
|   form-required   |                                           The \* element marking an input field as required                                           |
| form-group-error  |                            The error text shown for required fields in the <br>form that are still empty.                             |

## Some known issues

There are some known issues you might encounter while using the `FormBuilder` component.

- Inputs of type "file" don't reset after submitting the form.
- The dropdown input takes full available width of the form. (Feel free to override this behaviour using global classnames `form-input-dropdown` & `form-group-dropdown`).

## P.S: This project is bootstrapped with [TSDX](https://tsdx.io/)

TSDX is a Zero-config CLI tool for TypeScript package development. Please check out more about TSDX on the site.
