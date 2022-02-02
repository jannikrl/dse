# Design System Editor
The editor is build to learn technologies within the React eco-system. The editor is build using:
- Redux Toolkit
- TypeScript
- Hooks
- React Testing Library
- CSS modules
- 3D CSS transformation and transitions


## The Concept
I was working in the mobile department of Widex, where I worked on the design system as a designer. I realised that we spend a lot of time building the same UI components as reusable parts first in our design software, then in iOS and then again in Android. In most cases we wanted the exact same look and feel.

So, I asked myself: **"Would it be possible to define a component once and then generate a design file, an iOS file and an Android file from that definition?"**

The editor is a suggestion on how that would work.

## Preview
https://user-images.githubusercontent.com/1298449/152153700-58e839aa-ebac-4d34-950c-27376fccdcd9.mov


## The Definition format
The editor builds a "definition" of a UI component. The definition is used for rendering the component in the editor and for generating files for other software to use.

The definition is a tree structure, where every node in the tree have a type, an id, properties and optionally children.

An example of a rectangle-node:
```json
{
    "type": "rectangle",
    "id": 1,
    "properties": {
      "padding": 16,
      "backgroundColor": "#44CCFF",
      "borderRadius": 0,
    },
    "children": [],
}
```

## The Application
- In the features folder (src > features) is the four building blocks of the editor: Topbar, Layers Panel, Properties Panel and Arena. The folders are bundles that contain both React components, Redux store and other relevant files for a given feature.
- The definition is rendered inside the Arena using recursion. The Tree component renders the first node. The Node component then renders a rectangle, text, icon, or stack element and then calls itself until the whole tree is rendered.
- The main state of the application is faily simple. It stores the definition, what node is selected and what node the mouse is over. The Arena, the Layers and Properties Panel just read or update those three values.
- In the keyPress folder (src > features > arena > hooks > keyPress) is hooks that make it possible for a component to listens for key press. It uses the useEffect to add eventlisteners and the useEffect cleanup function to remove event listeners. The key press is for eksemple used for viewing the component in 3D or expanding hidden stacks. 
- The 3D effect is created by rotating the Arena in 3D using the CSS property rotate3d. The rectangle, text, icon, or stack element is at the same time positioned in the 3D space using the transform translateZ property and having a shadow added.
- In the layers-panel folder (src > features > layers-panel) is examples of test written using React Testing Library. The redux state is preloaded and it is tested if it renders correct. In the last test case a click event is used to simulate user interaction, and test if the components react to it.
- In the components folder (src > components) are shared UI and typography components. The components are configurable. E.g. the Button can be modified using variants and size props. 
- In the assets folder (src > assets) is icons and CSS variables. The CSS variables are used for theming values like colors, spacing, and texts values, and default values for shared UI components like buttons, labels, and inputs.
