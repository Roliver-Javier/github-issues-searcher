import {
  FETCH_ISSUES_INFO_FROM_REPO,
  GET_FIELTERED_ISSUES,
  ISSUE_TYPED,
  SET_ISSUE_SELECTED,
} from '../../store/types';
import issuesReducer from '../../store/reducers/issuesReducer';

describe('Issues Reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      data: [],
      dataFiltered: [],
      issueTyped: '',
      issueSelected: null,
    };
  });
  it('Should return default state', () => {
    const newState = issuesReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return new issue selected state if receiving type', () => {
    const issueSelected = {
      url: 'https://api.github.com/repos/facebook/react/issues/19901',
      repository_url: 'https://api.github.com/repos/facebook/react',
      labels_url:
        'https://api.github.com/repos/facebook/react/issues/19901/labels{/name}',
      comments_url:
        'https://api.github.com/repos/facebook/react/issues/19901/comments',
      events_url:
        'https://api.github.com/repos/facebook/react/issues/19901/events',
      html_url: 'https://github.com/facebook/react/issues/19901',
      id: 708424556,
      node_id: 'MDU6SXNzdWU3MDg0MjQ1NTY=',
      number: 19901,
      title:
        'Bug: hydrating fails with nested paragraph and dangerouslySetInnerHTML',
      user: {
        login: 'romeovs',
        id: 1250185,
        node_id: 'MDQ6VXNlcjEyNTAxODU=',
        avatar_url: 'https://avatars0.githubusercontent.com/u/1250185?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/romeovs',
        html_url: 'https://github.com/romeovs',
        followers_url: 'https://api.github.com/users/romeovs/followers',
        following_url:
          'https://api.github.com/users/romeovs/following{/other_user}',
        gists_url: 'https://api.github.com/users/romeovs/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/romeovs/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/romeovs/subscriptions',
        organizations_url: 'https://api.github.com/users/romeovs/orgs',
        repos_url: 'https://api.github.com/users/romeovs/repos',
        events_url: 'https://api.github.com/users/romeovs/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/romeovs/received_events',
        type: 'User',
        site_admin: false,
      },
      labels: [
        {
          id: 155984160,
          node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
          url:
            'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
          name: 'Status: Unconfirmed',
          color: 'd4c5f9',
          default: false,
          description:
            "A potential issue that we haven't yet confirmed as a bug",
        },
      ],
      state: 'open',
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 0,
      created_at: '2020-09-24T19:36:39Z',
      updated_at: '2020-09-24T19:39:42Z',
      closed_at: null,
      author_association: 'NONE',
      active_lock_reason: null,
      body:
        '<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\n\r\nReact version: 16.13.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Use the `dangerouslySetInnerHTML` on a `p` element where the `__html` contains a `<p>` tag\r\n2. Server-side render this component and try to hydrate\r\n\r\nLink to code example:\r\n```html\r\n<!doctype html>\r\n<html>\r\n  <head>\r\n    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>\r\n    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>\r\n  </head>\r\n  <body>\r\n    <!-- Pretend for an instance that this html was generated on the server by ReactDOM.renderToString() -->\r\n    <div id="app"><p><p>Dope!</p></p></div>\r\n  </body>\r\n  <script>\r\n    function Component() {\r\n      return React.createElement("p", {\r\n        dangerouslySetInnerHTML: { __html: "<p>Dope!</p>" },\r\n      })\r\n    }\r\n    const component = React.createElement(Component)\r\n    const root = document.getElementById("app")\r\n    ReactDOM.hydrate(component, root)\r\n  </script>\r\n</html>\r\n```\r\n\r\nJSFiddles:\r\n- This one breaks because it has nesting `p`:  https://jsfiddle.net/mw19p0g3/\r\n- This one works because the wrapper is `div` instead of `p`: https://jsfiddle.net/mw19p0g3/2/\r\n- This one works too because there no nesting `p` in the html: https://jsfiddle.net/mw19p0g3/3/\r\n\r\n## The current behaviour\r\nThe `ReactDOM.hydrate` throws a cryptic error:\r\n```\r\nWarning: Prop `dangerouslySetInnerHTML` did not match. Server: "" Client: "<p>Dope!</p>"\r\n```\r\nNote the missing `Server: ""` string.\r\n\r\n## The expected behavior\r\nDo not throw an error and just hydrate the component as expected.\r\n\r\nI realise that nesting `p` elements does not conform to the [HTML spec for the p element](https://www.w3.org/TR/html401/struct/text.html#h-9.3.1).\r\nIf React chooses not to support the use case of nesting `p` tags through `dangerouslySetInnerHTML`, that\'s understandable. \r\nIn that case the error should be more descriptive and there should probably also be an error or warning while performing the server side render. \r\nIt should also be documenting somewhere that will easily show up in Google.\r\n\r\nThe current behaviour is very confusing and it took me a while to track down what was going on.\r\n',
      performed_via_github_app: null,
      index: 4,
    };
    const data = { type: SET_ISSUE_SELECTED, payload: { ...issueSelected } };
    const newState = issuesReducer(initialState, data);
    expect(newState.issueSelected).toEqual(data.payload);
  });

  it('Should return new issue typed if receiving type', () => {
    const data = {
      type: ISSUE_TYPED,
      payload: 'something is typing...',
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.issueTyped).toEqual(data.payload);
  });

  it('Should return new data filtered if receiving type', () => {
    const dataFiltered = [
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19901',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19901/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19901/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19901/events',
        html_url: 'https://github.com/facebook/react/issues/19901',
        id: 708424556,
        node_id: 'MDU6SXNzdWU3MDg0MjQ1NTY=',
        number: 19901,
        title:
          'Bug: hydrating fails with nested paragraph and dangerouslySetInnerHTML',
        user: {
          login: 'romeovs',
          id: 1250185,
          node_id: 'MDQ6VXNlcjEyNTAxODU=',
          avatar_url: 'https://avatars0.githubusercontent.com/u/1250185?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/romeovs',
          html_url: 'https://github.com/romeovs',
          followers_url: 'https://api.github.com/users/romeovs/followers',
          following_url:
            'https://api.github.com/users/romeovs/following{/other_user}',
          gists_url: 'https://api.github.com/users/romeovs/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/romeovs/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/romeovs/subscriptions',
          organizations_url: 'https://api.github.com/users/romeovs/orgs',
          repos_url: 'https://api.github.com/users/romeovs/repos',
          events_url: 'https://api.github.com/users/romeovs/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/romeovs/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 0,
        created_at: '2020-09-24T19:36:39Z',
        updated_at: '2020-09-24T19:39:42Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          '<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\n\r\nReact version: 16.13.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Use the `dangerouslySetInnerHTML` on a `p` element where the `__html` contains a `<p>` tag\r\n2. Server-side render this component and try to hydrate\r\n\r\nLink to code example:\r\n```html\r\n<!doctype html>\r\n<html>\r\n  <head>\r\n    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>\r\n    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>\r\n  </head>\r\n  <body>\r\n    <!-- Pretend for an instance that this html was generated on the server by ReactDOM.renderToString() -->\r\n    <div id="app"><p><p>Dope!</p></p></div>\r\n  </body>\r\n  <script>\r\n    function Component() {\r\n      return React.createElement("p", {\r\n        dangerouslySetInnerHTML: { __html: "<p>Dope!</p>" },\r\n      })\r\n    }\r\n    const component = React.createElement(Component)\r\n    const root = document.getElementById("app")\r\n    ReactDOM.hydrate(component, root)\r\n  </script>\r\n</html>\r\n```\r\n\r\nJSFiddles:\r\n- This one breaks because it has nesting `p`:  https://jsfiddle.net/mw19p0g3/\r\n- This one works because the wrapper is `div` instead of `p`: https://jsfiddle.net/mw19p0g3/2/\r\n- This one works too because there no nesting `p` in the html: https://jsfiddle.net/mw19p0g3/3/\r\n\r\n## The current behaviour\r\nThe `ReactDOM.hydrate` throws a cryptic error:\r\n```\r\nWarning: Prop `dangerouslySetInnerHTML` did not match. Server: "" Client: "<p>Dope!</p>"\r\n```\r\nNote the missing `Server: ""` string.\r\n\r\n## The expected behavior\r\nDo not throw an error and just hydrate the component as expected.\r\n\r\nI realise that nesting `p` elements does not conform to the [HTML spec for the p element](https://www.w3.org/TR/html401/struct/text.html#h-9.3.1).\r\nIf React chooses not to support the use case of nesting `p` tags through `dangerouslySetInnerHTML`, that\'s understandable. \r\nIn that case the error should be more descriptive and there should probably also be an error or warning while performing the server side render. \r\nIt should also be documenting somewhere that will easily show up in Google.\r\n\r\nThe current behaviour is very confusing and it took me a while to track down what was going on.\r\n',
        performed_via_github_app: null,
      },
    ];
    const data = {
      type: GET_FIELTERED_ISSUES,
      payload: [...dataFiltered],
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.dataFiltered).toEqual(data.payload);
  });

  it('Should return new issues data if receiving type', () => {
    const issues = [
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19911',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19911/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19911/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19911/events',
        html_url: 'https://github.com/facebook/react/issues/19911',
        id: 709189210,
        node_id: 'MDU6SXNzdWU3MDkxODkyMTA=',
        number: 19911,
        title: 'Bug: devtools Profiler causes unexpected errors',
        user: {
          login: 'henryqdineen',
          id: 682132,
          node_id: 'MDQ6VXNlcjY4MjEzMg==',
          avatar_url: 'https://avatars3.githubusercontent.com/u/682132?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/henryqdineen',
          html_url: 'https://github.com/henryqdineen',
          followers_url: 'https://api.github.com/users/henryqdineen/followers',
          following_url:
            'https://api.github.com/users/henryqdineen/following{/other_user}',
          gists_url:
            'https://api.github.com/users/henryqdineen/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/henryqdineen/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/henryqdineen/subscriptions',
          organizations_url: 'https://api.github.com/users/henryqdineen/orgs',
          repos_url: 'https://api.github.com/users/henryqdineen/repos',
          events_url:
            'https://api.github.com/users/henryqdineen/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/henryqdineen/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 710573595,
            node_id: 'MDU6TGFiZWw3MTA1NzM1OTU=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools',
            name: 'Component: Developer Tools',
            color: 'fbca04',
            default: false,
            description: null,
          },
          {
            id: 40929151,
            node_id: 'MDU6TGFiZWw0MDkyOTE1MQ==',
            url:
              'https://api.github.com/repos/facebook/react/labels/Type:%20Bug',
            name: 'Type: Bug',
            color: 'b60205',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: {
          login: 'bvaughn',
          id: 29597,
          node_id: 'MDQ6VXNlcjI5NTk3',
          avatar_url: 'https://avatars0.githubusercontent.com/u/29597?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/bvaughn',
          html_url: 'https://github.com/bvaughn',
          followers_url: 'https://api.github.com/users/bvaughn/followers',
          following_url:
            'https://api.github.com/users/bvaughn/following{/other_user}',
          gists_url: 'https://api.github.com/users/bvaughn/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/bvaughn/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/bvaughn/subscriptions',
          organizations_url: 'https://api.github.com/users/bvaughn/orgs',
          repos_url: 'https://api.github.com/users/bvaughn/repos',
          events_url: 'https://api.github.com/users/bvaughn/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/bvaughn/received_events',
          type: 'User',
          site_admin: false,
        },
        assignees: [
          {
            login: 'bvaughn',
            id: 29597,
            node_id: 'MDQ6VXNlcjI5NTk3',
            avatar_url: 'https://avatars0.githubusercontent.com/u/29597?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/bvaughn',
            html_url: 'https://github.com/bvaughn',
            followers_url: 'https://api.github.com/users/bvaughn/followers',
            following_url:
              'https://api.github.com/users/bvaughn/following{/other_user}',
            gists_url: 'https://api.github.com/users/bvaughn/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/bvaughn/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/bvaughn/subscriptions',
            organizations_url: 'https://api.github.com/users/bvaughn/orgs',
            repos_url: 'https://api.github.com/users/bvaughn/repos',
            events_url: 'https://api.github.com/users/bvaughn/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/bvaughn/received_events',
            type: 'User',
            site_admin: false,
          },
        ],
        milestone: null,
        comments: 1,
        created_at: '2020-09-25T18:18:33Z',
        updated_at: '2020-09-25T19:58:32Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        body:
          'We noticed that our app would behave differently during profiling runs and trigger errors. I\'m not totally sure what the underlying issue is but I was able to put together a example app to reproduce. As far as I can tell it has to do with how devtools is overriding `console.warn` and `console.error`. In that case `describeNativeComponentFrame()` will call a function component with no args. This works fine as the error is caught in `describeNativeComponentFrame()` but in it looks like a `useEffect()` that accesses those `props` is still triggered and it does not expect `props` to be undefined. \r\n\r\nI realize that having `props` in the dependencies array of the `useEffect` doesn\'t really make sense but I still think it probably shouldn\'t error.\r\n\r\nReact version: 16.13.1\r\nReact devtools version: 4.8.2 \r\n\r\n## Steps To Reproduce\r\n\r\n1. Open link to code example below\r\n2. Click "Open In New Window" from the "Browser" tab\r\n3. Observe a simple app with only `<h1>Hello World</h1>`\r\n3. Open the React devtools Profiler tab\r\n4. Click "Reload and start profiling"\r\n5. Observe an error `Uncaught TypeError: Cannot read property \'foo\' of undefined`\r\n\r\nLink to code example:\r\n\r\nhttps://codesandbox.io/s/cool-sun-wdrry\r\n\r\n## The current behavior\r\n\r\n![wdrry csb app_](https://user-images.githubusercontent.com/682132/94301311-5b1b7900-ff38-11ea-9c5d-335e2e6f35b9.png)\r\n\r\n## The expected behavior\r\n\r\nThe app should work as it while not profile. It should render a `<h1>Hello World</h1>`\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19910',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19910/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19910/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19910/events',
        html_url: 'https://github.com/facebook/react/issues/19910',
        id: 709137605,
        node_id: 'MDU6SXNzdWU3MDkxMzc2MDU=',
        number: 19910,
        title: 'Suggestion: global custom attributes',
        user: {
          login: 'jsenaribeiro',
          id: 5367049,
          node_id: 'MDQ6VXNlcjUzNjcwNDk=',
          avatar_url: 'https://avatars2.githubusercontent.com/u/5367049?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/jsenaribeiro',
          html_url: 'https://github.com/jsenaribeiro',
          followers_url: 'https://api.github.com/users/jsenaribeiro/followers',
          following_url:
            'https://api.github.com/users/jsenaribeiro/following{/other_user}',
          gists_url:
            'https://api.github.com/users/jsenaribeiro/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/jsenaribeiro/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/jsenaribeiro/subscriptions',
          organizations_url: 'https://api.github.com/users/jsenaribeiro/orgs',
          repos_url: 'https://api.github.com/users/jsenaribeiro/repos',
          events_url:
            'https://api.github.com/users/jsenaribeiro/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/jsenaribeiro/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 1,
        created_at: '2020-09-25T17:28:43Z',
        updated_at: '2020-09-25T20:06:27Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'Hi, \r\n\r\nI would like to suggest this new feature that may be useful: a custom global attribute as a DRY and KISS feature for sharing some repetitive coding or verbose styling. It is a bit familiar to Angular directive concept, but it is more functional and react-like. \r\n\r\n* **alternative 1**: using **@** token in component attribute working as a function injetor\r\n\r\n```jsx\r\nconst glyphIcon = (elm, val) => elm.className = "glyphicon glyphicon-" + val + " icon";\r\n\r\n<div @glyphIcon="ok" >...</div>\r\n```\r\n\r\n* **alternative 2**: function decorators (not support in ecmascript) would be nice for kebab-case notation\r\n\r\n```jsx\r\n@directive("glyph-icon")\r\nconst glyphIcon = (elm, val) => elm.className = "glyphicon glyphicon-" + val + " icon";\r\n\r\n<div glyph-icon="ok" >...</div>\r\n```',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19905',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19905/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19905/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19905/events',
        html_url: 'https://github.com/facebook/react/issues/19905',
        id: 708642219,
        node_id: 'MDU6SXNzdWU3MDg2NDIyMTk=',
        number: 19905,
        title: 'Design problem in new JSX transformation',
        user: {
          login: 'Jack-Works',
          id: 5390719,
          node_id: 'MDQ6VXNlcjUzOTA3MTk=',
          avatar_url: 'https://avatars3.githubusercontent.com/u/5390719?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/Jack-Works',
          html_url: 'https://github.com/Jack-Works',
          followers_url: 'https://api.github.com/users/Jack-Works/followers',
          following_url:
            'https://api.github.com/users/Jack-Works/following{/other_user}',
          gists_url: 'https://api.github.com/users/Jack-Works/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/Jack-Works/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/Jack-Works/subscriptions',
          organizations_url: 'https://api.github.com/users/Jack-Works/orgs',
          repos_url: 'https://api.github.com/users/Jack-Works/repos',
          events_url:
            'https://api.github.com/users/Jack-Works/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/Jack-Works/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 4,
        created_at: '2020-09-25T05:01:47Z',
        updated_at: '2020-09-26T01:42:02Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        body:
          'React 17 introduces [a new JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). I found there is some problem in [the TypeScript implementation](https://github.com/microsoft/TypeScript/pull/39199#discussion_r494729839)\r\n\r\n> Hi! @weswigham I think this is wrong. You should not treat it as a "base" of the import. It should be a fully qualified import specifier. With the current behavior, it is impossible to make it emit like: import { jsx as \\_jsx } from "//cdn.example.com/my-jsx-lib/jsx-runtime.js" cause it is not possible to add a ".js" at the end of the import specifier.\r\n\r\n> This also requires the imported file to name exactly as "jsx-runtime".\r\n\r\nAnd @weswigham answered me that:\r\n\r\n> ...Yeah, so that wasn\'t _really_ my choice - it\'s how the `react` maintainers implemented the same option in [the `babel` transform.](https://babeljs.io/docs/en/babel-preset-react#importsource) (And we just want to match the functionality provided by babel here, without overstepping.) The runtime being accessible at `${source}/jsx-runtime` and `${source}/jsx-dev-runtime`, based on how the options are presented, is part of the API contract for these endpoints (probably so the import can be swapped between dev/non-dev without explicitly reconfiguring the import? I dunno, I\'m guessing.).\r\n\r\nSo I believe I should post my concerns here. The current interpretation of the option **importSource** in the babel (or **jsxImportSource** in TypeScript) are not allowing `import {jsx} from \'//cdn.example.com/my-jsx-lib/jsx-runtime.js\'` because it is forcing the end of the import path to be `jsx-runtime` or `jsx-dev-runtime`\r\n\r\nMaybe I think I should also cc @lunaruan who [implemented this in babel](https://github.com/babel/babel/pull/11154)',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19902',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19902/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19902/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19902/events',
        html_url: 'https://github.com/facebook/react/pull/19902',
        id: 708437548,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkyNjY5MjQ3',
        number: 19902,
        title: 'Remove disableSchedulerTimeoutInWorkLoop flag',
        user: {
          login: 'acdlite',
          id: 3624098,
          node_id: 'MDQ6VXNlcjM2MjQwOTg=',
          avatar_url: 'https://avatars0.githubusercontent.com/u/3624098?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/acdlite',
          html_url: 'https://github.com/acdlite',
          followers_url: 'https://api.github.com/users/acdlite/followers',
          following_url:
            'https://api.github.com/users/acdlite/following{/other_user}',
          gists_url: 'https://api.github.com/users/acdlite/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/acdlite/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/acdlite/subscriptions',
          organizations_url: 'https://api.github.com/users/acdlite/orgs',
          repos_url: 'https://api.github.com/users/acdlite/repos',
          events_url: 'https://api.github.com/users/acdlite/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/acdlite/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 1775958285,
            node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
            url:
              'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
            name: 'React Core Team',
            color: '9149d1',
            default: false,
            description: 'Opened by a member of the React Core Team',
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 3,
        created_at: '2020-09-24T20:00:13Z',
        updated_at: '2020-09-24T20:08:36Z',
        closed_at: null,
        author_association: 'MEMBER',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19902',
          html_url: 'https://github.com/facebook/react/pull/19902',
          diff_url: 'https://github.com/facebook/react/pull/19902.diff',
          patch_url: 'https://github.com/facebook/react/pull/19902.patch',
        },
        body:
          "We found and mitigated the root cause of the regression that led us to temporarily revert this change. So now I'm un-reverting it.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19901',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19901/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19901/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19901/events',
        html_url: 'https://github.com/facebook/react/issues/19901',
        id: 708424556,
        node_id: 'MDU6SXNzdWU3MDg0MjQ1NTY=',
        number: 19901,
        title:
          'Bug: hydrating fails with nested paragraph and dangerouslySetInnerHTML',
        user: {
          login: 'romeovs',
          id: 1250185,
          node_id: 'MDQ6VXNlcjEyNTAxODU=',
          avatar_url: 'https://avatars0.githubusercontent.com/u/1250185?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/romeovs',
          html_url: 'https://github.com/romeovs',
          followers_url: 'https://api.github.com/users/romeovs/followers',
          following_url:
            'https://api.github.com/users/romeovs/following{/other_user}',
          gists_url: 'https://api.github.com/users/romeovs/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/romeovs/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/romeovs/subscriptions',
          organizations_url: 'https://api.github.com/users/romeovs/orgs',
          repos_url: 'https://api.github.com/users/romeovs/repos',
          events_url: 'https://api.github.com/users/romeovs/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/romeovs/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 0,
        created_at: '2020-09-24T19:36:39Z',
        updated_at: '2020-09-24T19:39:42Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          '<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\n\r\nReact version: 16.13.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Use the `dangerouslySetInnerHTML` on a `p` element where the `__html` contains a `<p>` tag\r\n2. Server-side render this component and try to hydrate\r\n\r\nLink to code example:\r\n```html\r\n<!doctype html>\r\n<html>\r\n  <head>\r\n    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>\r\n    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>\r\n  </head>\r\n  <body>\r\n    <!-- Pretend for an instance that this html was generated on the server by ReactDOM.renderToString() -->\r\n    <div id="app"><p><p>Dope!</p></p></div>\r\n  </body>\r\n  <script>\r\n    function Component() {\r\n      return React.createElement("p", {\r\n        dangerouslySetInnerHTML: { __html: "<p>Dope!</p>" },\r\n      })\r\n    }\r\n    const component = React.createElement(Component)\r\n    const root = document.getElementById("app")\r\n    ReactDOM.hydrate(component, root)\r\n  </script>\r\n</html>\r\n```\r\n\r\nJSFiddles:\r\n- This one breaks because it has nesting `p`:  https://jsfiddle.net/mw19p0g3/\r\n- This one works because the wrapper is `div` instead of `p`: https://jsfiddle.net/mw19p0g3/2/\r\n- This one works too because there no nesting `p` in the html: https://jsfiddle.net/mw19p0g3/3/\r\n\r\n## The current behaviour\r\nThe `ReactDOM.hydrate` throws a cryptic error:\r\n```\r\nWarning: Prop `dangerouslySetInnerHTML` did not match. Server: "" Client: "<p>Dope!</p>"\r\n```\r\nNote the missing `Server: ""` string.\r\n\r\n## The expected behavior\r\nDo not throw an error and just hydrate the component as expected.\r\n\r\nI realise that nesting `p` elements does not conform to the [HTML spec for the p element](https://www.w3.org/TR/html401/struct/text.html#h-9.3.1).\r\nIf React chooses not to support the use case of nesting `p` tags through `dangerouslySetInnerHTML`, that\'s understandable. \r\nIn that case the error should be more descriptive and there should probably also be an error or warning while performing the server side render. \r\nIt should also be documenting somewhere that will easily show up in Google.\r\n\r\nThe current behaviour is very confusing and it took me a while to track down what was going on.\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19900',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19900/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19900/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19900/events',
        html_url: 'https://github.com/facebook/react/pull/19900',
        id: 708316452,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkyNTY3NjMw',
        number: 19900,
        title: '[draft] Temporarily disable Profiler commit hooks flag',
        user: {
          login: 'bvaughn',
          id: 29597,
          node_id: 'MDQ6VXNlcjI5NTk3',
          avatar_url: 'https://avatars0.githubusercontent.com/u/29597?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/bvaughn',
          html_url: 'https://github.com/bvaughn',
          followers_url: 'https://api.github.com/users/bvaughn/followers',
          following_url:
            'https://api.github.com/users/bvaughn/following{/other_user}',
          gists_url: 'https://api.github.com/users/bvaughn/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/bvaughn/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/bvaughn/subscriptions',
          organizations_url: 'https://api.github.com/users/bvaughn/orgs',
          repos_url: 'https://api.github.com/users/bvaughn/repos',
          events_url: 'https://api.github.com/users/bvaughn/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/bvaughn/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 1775958285,
            node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
            url:
              'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
            name: 'React Core Team',
            color: '9149d1',
            default: false,
            description: 'Opened by a member of the React Core Team',
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 3,
        created_at: '2020-09-24T16:35:40Z',
        updated_at: '2020-09-24T17:05:36Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19900',
          html_url: 'https://github.com/facebook/react/pull/19900',
          diff_url: 'https://github.com/facebook/react/pull/19900.diff',
          patch_url: 'https://github.com/facebook/react/pull/19900.patch',
        },
        body:
          "This will enable us to enable/disable it on www to see if it causes a regression.\r\n\r\nAt first I thought I'd make this flag static. Converting a static flag to dynamic isn't great, but this particular flag doesn't add any additional fields to a `Fiber`. However it would add an additional runtime check to a hot path so I'm going to just disable it entirely for now.\r\n\r\nThis PR does not need to land to take this measurement. I'll do an out-of-band sync with it.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19898',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19898/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19898/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19898/events',
        html_url: 'https://github.com/facebook/react/issues/19898',
        id: 708164279,
        node_id: 'MDU6SXNzdWU3MDgxNjQyNzk=',
        number: 19898,
        title: 'Bug: Cannot npm-link other project',
        user: {
          login: 'gopoqosntjbfhjjezh',
          id: 71828961,
          node_id: 'MDQ6VXNlcjcxODI4OTYx',
          avatar_url: 'https://avatars2.githubusercontent.com/u/71828961?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/gopoqosntjbfhjjezh',
          html_url: 'https://github.com/gopoqosntjbfhjjezh',
          followers_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/followers',
          following_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/following{/other_user}',
          gists_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/subscriptions',
          organizations_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/orgs',
          repos_url: 'https://api.github.com/users/gopoqosntjbfhjjezh/repos',
          events_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/gopoqosntjbfhjjezh/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 2,
        created_at: '2020-09-24T13:18:34Z',
        updated_at: '2020-09-24T17:01:48Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'I\'m not sure its a bug, but I am running out of ideas. \r\n\r\nI\'m trying to import a self-written module.\r\n\r\nReact version: 16.13.1\r\n\r\n## Steps To Reproduce\r\n\r\nI have the following setup\r\n\r\n```\r\nmyRoot\r\n  |-- t-lib\r\n  |        |-- src\r\n  |        |-- config-overwrides.js   (I\'m using react-app-rewired, but I think it\'s not relevant)\r\n  |        |-- package.json\r\n  |        |-- ... other stuff\r\n  |-- t-consumer\r\n  |        |-- src\r\n  |        |-- package.json\r\n  |        |-- ... other stuff\r\n```\r\n\r\nInside t-lib/package.json I have `name: \'t-lib\'`.\r\n\r\nSo, while in the folder of `t-consumer` I did:\r\n```\r\nnpm link ../t-lib\r\n```\r\n\r\nAnd in the t-consumer/src/App.js, I wrote `import myLib from \'t-lib\'` \r\n\r\nWhat I get is \r\n\r\n```\r\nSyntaxError: C:\\Users\\...\\t-lib\\src\\index.js: Support for the experimental syntax \'jsx\' isn\'t currently enabled (7:3):\r\n\r\n   5 | function MountApp(element) {\r\n   6 |  ReactDOM.render(\r\n>  7 |          <React.StrictMode>\r\n     |          ^\r\n   8 |                  <App />\r\n   9 |          </React.StrictMode>,\r\n  10 |          element\r\n\r\nAdd @babel/plugin-transform-react-jsx (https://git.io/vb4yd) to the \'plugins\' section of your Babel config to enable transformation.\r\n\r\n\r\nnpm ERR! code ELIFECYCLE\r\nnpm ERR! errno 1\r\nnpm ERR! t-consumer@0.1.0 build: `react-app-rewired build`\r\nnpm ERR! Exit status 1\r\nnpm ERR!\r\nnpm ERR! Failed at the t-consumer@0.1.0 build script.\r\nnpm ERR! This is probably not a problem with npm. There is likely additional logging output above.\r\n\r\nnpm ERR! A complete log of this run can be found in: ...\r\n```\r\n\r\n## The current behavior\r\nI get the error metioned above.\r\n\r\nI would like to note, that the error occures in the t-lib/src/index.js, not in the t-consumer project. So appearently the setup is correct, just babel gets confused somehow about the jsx.\r\n\r\n## The expected behavior\r\nI would like it to actually build the project, or possibly a hint, on which settings I have done wrong.\r\n\r\n## Code\r\n\r\nIn case it\'s needed, here is the code: (both projects are basicly the same, and just trying to get it to work)\r\n\r\n\r\n### public/index.html\r\n```\r\n<!DOCTYPE html>\r\n<html lang="en">\r\n\t<head>\r\n\t\t<meta charset="utf-8" />\r\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n\t\t<meta name="theme-color" content="#000000" />\r\n\t\t<meta\r\n\t\t\tname="description"\r\n\t\t\tcontent="Web site created using create-react-app"\r\n\t\t/>\r\n\t\t<title>React App</title>\r\n\t</head>\r\n\t<body>\r\n\t\t<noscript>You need to enable JavaScript to run this app.</noscript>\r\n\t\t<div id="root"></div>\r\n\t\t<script>\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\t// I know this is bad practice, it\'s just a proof of concept to get a library to work.\r\n\t\t\t\tconst element = document.getElementById(\'root\');\r\n\t\t\t\ttestConsumer.MountApp(element);\r\n\t\t\t}, 1000);\r\n\t\t</script>\r\n\t</body>\r\n</html>\r\n```\r\n\r\n### src/App.js\r\n```\r\nimport React from \'react\';\r\nimport myLib from \'t-lib\';  // only in the consumer\r\n\r\nfunction App() {\r\n\tconsole.log(myLib);\r\n\treturn <div>consumer</div>;\r\n}\r\n\r\nexport default App;\r\n```\r\n\r\n### src/index.js\r\n```\r\nimport React from \'react\';\r\nimport ReactDOM from \'react-dom\';\r\nimport App from \'./App\';\r\n\r\nfunction MountApp(element) {\r\n\tReactDOM.render(\r\n\t\t<React.StrictMode>\r\n\t\t\t<App />\r\n\t\t</React.StrictMode>,\r\n\t\telement\r\n\t);\r\n}\r\n\r\nexport { MountApp };\r\n```\r\n\r\n### config-overrides.js\r\n```\r\nconst path = require(\'path\');\r\n\r\nmodule.exports = {\r\n\twebpack: function (config, env) {\r\n\t\tconfig.output.filename = \'static/js/[name].js\';\r\n\t\tconfig.output.chunkFilename = \'static/js/[name].chunk.js\';\r\n\t\tconfig.output.library = \'testConsumer\';\r\n\t\treturn config;\r\n\t},\r\n\tpaths: function (paths, env) {\r\n\t\t// ...add your paths config\r\n\t\tpaths.appBuild = path.resolve(\r\n\t\t\tpath.join(\'..\', \'..\', \'MyWebpage\', \'t-consumer\')\r\n\t\t);\r\n\r\n\t\treturn paths;\r\n\t}\r\n};\r\n```\r\n\r\n### package.json\r\n```\r\n{\r\n\t"name": "t-consumer",\r\n\t"version": "0.1.0",\r\n\t"private": true,\r\n\t"dependencies": {\r\n\t\t"@testing-library/jest-dom": "^4.2.4",\r\n\t\t"@testing-library/react": "^9.5.0",\r\n\t\t"@testing-library/user-event": "^7.2.1",\r\n\t\t"react": "^16.13.1",\r\n\t\t"react-app-rewired": "^2.1.6",\r\n\t\t"react-dom": "^16.13.1",\r\n\t\t"react-scripts": "3.4.3"\r\n\t},\r\n\t"scripts": {\r\n\t\t"build": "react-app-rewired build",\r\n\t\t"eject": "react-scripts eject"\r\n\t},\r\n\t"eslintConfig": {\r\n\t\t"extends": "react-app"\r\n\t},\r\n\t"browserslist": {\r\n\t\t"production": [\r\n\t\t\t">0.2%",\r\n\t\t\t"not dead",\r\n\t\t\t"not op_mini all"\r\n\t\t],\r\n\t\t"development": [\r\n\t\t\t"last 1 chrome version",\r\n\t\t\t"last 1 firefox version",\r\n\t\t\t"last 1 safari version"\r\n\t\t]\r\n\t},\r\n\t"browser": "./src/index",\r\n\t"homepage": "t-consumer"\r\n}\r\n```',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19897',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19897/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19897/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19897/events',
        html_url: 'https://github.com/facebook/react/pull/19897',
        id: 708155578,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkyNDMzNjQ0',
        number: 19897,
        title: 'Fix contradiction in the README.md',
        user: {
          login: 'dmtrKovalenko',
          id: 16926049,
          node_id: 'MDQ6VXNlcjE2OTI2MDQ5',
          avatar_url: 'https://avatars0.githubusercontent.com/u/16926049?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/dmtrKovalenko',
          html_url: 'https://github.com/dmtrKovalenko',
          followers_url: 'https://api.github.com/users/dmtrKovalenko/followers',
          following_url:
            'https://api.github.com/users/dmtrKovalenko/following{/other_user}',
          gists_url:
            'https://api.github.com/users/dmtrKovalenko/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/dmtrKovalenko/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/dmtrKovalenko/subscriptions',
          organizations_url: 'https://api.github.com/users/dmtrKovalenko/orgs',
          repos_url: 'https://api.github.com/users/dmtrKovalenko/repos',
          events_url:
            'https://api.github.com/users/dmtrKovalenko/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/dmtrKovalenko/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 710573595,
            node_id: 'MDU6TGFiZWw3MTA1NzM1OTU=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools',
            name: 'Component: Developer Tools',
            color: 'fbca04',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 4,
        created_at: '2020-09-24T13:06:53Z',
        updated_at: '2020-09-24T17:04:48Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19897',
          html_url: 'https://github.com/facebook/react/pull/19897',
          diff_url: 'https://github.com/facebook/react/pull/19897.diff',
          patch_url: 'https://github.com/facebook/react/pull/19897.patch',
        },
        body:
          '<!--\r\n  Thanks for submitting a pull request!\r\n  We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory.\r\n\r\n  Before submitting a pull request, please make sure the following is done:\r\n\r\n  1. Fork [the repository](https://github.com/facebook/react) and create your branch from `master`.\r\n  2. Run `yarn` in the repository root.\r\n  3. If you\'ve fixed a bug or added code that should be tested, add tests!\r\n  4. Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.\r\n  5. Run `yarn test-prod` to test in the production environment. It supports the same options as `yarn test`.\r\n  6. If you need a debugger, run `yarn debug-test --watch TestName`, open `chrome://inspect`, and press "Inspect".\r\n  7. Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).\r\n  8. Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.\r\n  9. Run the [Flow](https://flowtype.org/) type checks (`yarn flow`).\r\n  10. If you haven\'t already, complete the CLA.\r\n\r\n  Learn more about contributing: https://reactjs.org/docs/how-to-contribute.html\r\n-->\r\n\r\n## Summary\r\n\r\nFix docs typo\r\n\r\n## Test Plan\r\n\r\n–\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19896',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19896/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19896/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19896/events',
        html_url: 'https://github.com/facebook/react/issues/19896',
        id: 707649540,
        node_id: 'MDU6SXNzdWU3MDc2NDk1NDA=',
        number: 19896,
        title: 'Bug: onBlur events not called when autofilled',
        user: {
          login: 'levigunz',
          id: 9252360,
          node_id: 'MDQ6VXNlcjkyNTIzNjA=',
          avatar_url: 'https://avatars1.githubusercontent.com/u/9252360?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/levigunz',
          html_url: 'https://github.com/levigunz',
          followers_url: 'https://api.github.com/users/levigunz/followers',
          following_url:
            'https://api.github.com/users/levigunz/following{/other_user}',
          gists_url: 'https://api.github.com/users/levigunz/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/levigunz/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/levigunz/subscriptions',
          organizations_url: 'https://api.github.com/users/levigunz/orgs',
          repos_url: 'https://api.github.com/users/levigunz/repos',
          events_url: 'https://api.github.com/users/levigunz/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/levigunz/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 0,
        created_at: '2020-09-23T20:13:52Z',
        updated_at: '2020-09-23T20:13:52Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          "While testing React 17.0.0-rc.2, we noticed a change in how React handles `onBlur` events when receiving updates via autofill (chrome in this instance). This [might be an intentional change](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#aligning-with-browsers), might be a problematic side effect of the event delegation changes or may just be a browser issue not in scope; I just want to verify.\r\n\r\nIn 16.13.1 when autofilling information, each input's `onBlur` is called.\r\n\r\nIn 17.0.0-rc.2, it appears that none of the input's `onBlur`s are called until you manually blur out of the input that had triggered the autofill. Even then, only the `onBlur` for this single input is called.\r\n\r\nReact version: 17.0.0-rc.2\r\nChrome version: 85.0.4183.102\r\n\r\n## Steps To Reproduce\r\n\r\n1. Click an input and autofill first name, last name and email.\r\n\r\nLink to code example:\r\n\r\n[React 17.0.0-rc.2](https://jsfiddle.net/qe9p3ujn/4/)\r\n[React 16.13.1](https://jsfiddle.net/qe9p3ujn/5/)\r\n\r\n## The current behavior\r\nReact 17: No `onBlur`s called with autofill.\r\nReact < 17: Each input that received autofill value has `onBlur` called.\r\n\r\n## The expected behavior\r\nI'm not really sure which one is correct. I lean toward React 17's current implementation where no `onBlur` is called.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19895',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19895/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19895/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19895/events',
        html_url: 'https://github.com/facebook/react/pull/19895',
        id: 707626062,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkxOTk1ODAy',
        number: 19895,
        title: 'Avoid traversing return path during commit',
        user: {
          login: 'bvaughn',
          id: 29597,
          node_id: 'MDQ6VXNlcjI5NTk3',
          avatar_url: 'https://avatars0.githubusercontent.com/u/29597?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/bvaughn',
          html_url: 'https://github.com/bvaughn',
          followers_url: 'https://api.github.com/users/bvaughn/followers',
          following_url:
            'https://api.github.com/users/bvaughn/following{/other_user}',
          gists_url: 'https://api.github.com/users/bvaughn/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/bvaughn/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/bvaughn/subscriptions',
          organizations_url: 'https://api.github.com/users/bvaughn/orgs',
          repos_url: 'https://api.github.com/users/bvaughn/repos',
          events_url: 'https://api.github.com/users/bvaughn/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/bvaughn/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 1775958285,
            node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
            url:
              'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
            name: 'React Core Team',
            color: '9149d1',
            default: false,
            description: 'Opened by a member of the React Core Team',
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 3,
        created_at: '2020-09-23T19:32:47Z',
        updated_at: '2020-09-25T20:37:54Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19895',
          html_url: 'https://github.com/facebook/react/pull/19895',
          diff_url: 'https://github.com/facebook/react/pull/19895.diff',
          patch_url: 'https://github.com/facebook/react/pull/19895.patch',
        },
        body:
          "Follow up to PR #19862 (see https://github.com/facebook/react/pull/19862#discussion_r491130225).\r\n\r\n---\r\n\r\nCommit phase durations (layout and passive) are stored on the nearest (ancestor) Profiler and bubble up during the commit phase. This bubbling used to be implemented by traversing the return path each time we finished working on a Profiler to find the next nearest Profiler.\r\n\r\nThis commit removes that traversal. Instead, we maintain a stack of nearest Profiler ancestor while recursing the tree. This stack is maintained in the work loop (since that's where the recursive functions are) and so bubbling of durations has also been moved from commit-work to the work loop.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19893',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19893/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19893/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19893/events',
        html_url: 'https://github.com/facebook/react/pull/19893',
        id: 707468493,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkxODY1MzY5',
        number: 19893,
        title: 'Deprecate old test script commands',
        user: {
          login: 'rickhanlonii',
          id: 2440089,
          node_id: 'MDQ6VXNlcjI0NDAwODk=',
          avatar_url: 'https://avatars0.githubusercontent.com/u/2440089?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/rickhanlonii',
          html_url: 'https://github.com/rickhanlonii',
          followers_url: 'https://api.github.com/users/rickhanlonii/followers',
          following_url:
            'https://api.github.com/users/rickhanlonii/following{/other_user}',
          gists_url:
            'https://api.github.com/users/rickhanlonii/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/rickhanlonii/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/rickhanlonii/subscriptions',
          organizations_url: 'https://api.github.com/users/rickhanlonii/orgs',
          repos_url: 'https://api.github.com/users/rickhanlonii/repos',
          events_url:
            'https://api.github.com/users/rickhanlonii/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/rickhanlonii/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 1775958285,
            node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
            url:
              'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
            name: 'React Core Team',
            color: '9149d1',
            default: false,
            description: 'Opened by a member of the React Core Team',
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 6,
        created_at: '2020-09-23T15:30:21Z',
        updated_at: '2020-09-23T16:16:29Z',
        closed_at: null,
        author_association: 'MEMBER',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19893',
          html_url: 'https://github.com/facebook/react/pull/19893',
          diff_url: 'https://github.com/facebook/react/pull/19893.diff',
          patch_url: 'https://github.com/facebook/react/pull/19893.patch',
        },
        body:
          '## Overview\r\n\r\nThese aliases have been replaced with the easier to use arguments like `--debug` and `--prod` and the aliases have been proxing to the new commands for awhile now.\r\n\r\nDeprecating the aliases now to give people a chance to use the new commands directly before removing them later.',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19892',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19892/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19892/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19892/events',
        html_url: 'https://github.com/facebook/react/pull/19892',
        id: 707388608,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkxNzk5ODg3',
        number: 19892,
        title: 'RFC: Add scheduling profiler to DevTools',
        user: {
          login: 'taneliang',
          id: 12784593,
          node_id: 'MDQ6VXNlcjEyNzg0NTkz',
          avatar_url: 'https://avatars2.githubusercontent.com/u/12784593?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/taneliang',
          html_url: 'https://github.com/taneliang',
          followers_url: 'https://api.github.com/users/taneliang/followers',
          following_url:
            'https://api.github.com/users/taneliang/following{/other_user}',
          gists_url: 'https://api.github.com/users/taneliang/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/taneliang/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/taneliang/subscriptions',
          organizations_url: 'https://api.github.com/users/taneliang/orgs',
          repos_url: 'https://api.github.com/users/taneliang/repos',
          events_url: 'https://api.github.com/users/taneliang/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/taneliang/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 12,
        created_at: '2020-09-23T13:54:36Z',
        updated_at: '2020-09-25T14:32:53Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19892',
          html_url: 'https://github.com/facebook/react/pull/19892',
          diff_url: 'https://github.com/facebook/react/pull/19892.diff',
          patch_url: 'https://github.com/facebook/react/pull/19892.patch',
        },
        body:
          "<!--\r\n  Thanks for submitting a pull request!\r\n  We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory.\r\n\r\n  Before submitting a pull request, please make sure the following is done:\r\n\r\n  1. Fork [the repository](https://github.com/facebook/react) and create your branch from `master`.\r\n  2. Run `yarn` in the repository root.\r\n  3. If you've fixed a bug or added code that should be tested, add tests!\r\n  4. Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.\r\n  5. Run `yarn test-prod` to test in the production environment. It supports the same options as `yarn test`.\r\n  6. If you need a debugger, run `yarn debug-test --watch TestName`, open `chrome://inspect`, and press \"Inspect\".\r\n  7. Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).\r\n  8. Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.\r\n  9. Run the [Flow](https://flowtype.org/) type checks (`yarn flow`).\r\n  10. If you haven't already, complete the CLA.\r\n\r\n  Learn more about contributing: https://reactjs.org/docs/how-to-contribute.html\r\n-->\r\n\r\n## Summary\r\n\r\nThis PR adds the scheduling profiler as a new tab/panel to DevTools. I'm not sure if there are better approaches though; feedback welcome!\r\n\r\n![main](https://user-images.githubusercontent.com/12784593/94020160-2fd44500-fde5-11ea-85f2-a08e6f09ffa4.gif)\r\n\r\nThe main goal of integrating is to allow us to add a record button to record a performance profile in a future PR. I've figured out a way to do it, and I've made a POC here: https://github.com/taneliang/react-scheduling-profiler-devtools-integration-poc.\r\n\r\nThe scheduling profiler is hidden behind a new `enableIntegratedSchedulingProfiler` DevTools feature flag. Apart from a bundle size increase (`main.js` grows from 1.22 MiB to 1.77 MiB), this PR shouldn't affect any functionality in the existing DevTools if the feature flag is off.\r\n\r\nThis PR is nearly complete, but I'm not sure if adding a tab is what you have in mind @bvaughn. I'm also aware that React 17 will be released soon, and I'm not sure if you'll want to wait until after that release. If this approach looks good and we want to proceed, I'll finish the remaining tasks :)\r\n\r\n### Notes\r\n\r\n- Scheduling profiler dark mode isn't disabled in the shell and core packages, even if the dark mode flag is set to false. This is happening because those packages don't mount the scheduling profiler in a different document. As the scheduling profiler has some usability issues in dark mode (from the minor (always-white canvas background), to the major (invisible white tooltip text on a white background)), this likely blocks the scheduling profiler from being released as an integrated part of DevTools. Although we can fix this now by switching the DevTools to light mode when the user opens the scheduling profiler tab, I think it'll be better to just fix the dark mode colors. I/we can do this in future PRs.\r\n- `main.js` bundle size increases from 1.22 MiB to 1.77 MiB. We can trim this to 1.67 MiB if we remove the `profilerBrowser.png` asset.\r\n- The image causes the scheduling profiler to scroll in the shell package.\r\n\r\n### TODO\r\n\r\n- [ ] Ensure Edge extension works (it probably works but I haven't tested it).\r\n- [ ] Fix context menu dismissal behavior.\r\n\r\n### Future work\r\n\r\n- Implement profile record button\r\n- Replace scheduling profiler tab icon (it's currently the same one as the Profiler tab)\r\n- Add Settings modal to non-standalone deployment of scheduling profiler\r\n\r\n## Test Plan\r\n\r\n<!-- Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes the user interface. -->\r\n\r\n- Tested Chrome and Firefox extensions.\r\n- Tested Electron app\r\n- Tested shell\r\n\t![image](https://user-images.githubusercontent.com/12784593/94021628-cce3ad80-fde6-11ea-9a9c-473522952f66.png)\r\n- Flipped `enableIntegratedSchedulingProfiler` to false and ensured scheduling profiler tab/panel does not appear.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19891',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19891/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19891/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19891/events',
        html_url: 'https://github.com/facebook/react/issues/19891',
        id: 707312008,
        node_id: 'MDU6SXNzdWU3MDczMTIwMDg=',
        number: 19891,
        title:
          'FR: Allow displaying debug information for reconcilers in DevTools',
        user: {
          login: 'derolf',
          id: 435817,
          node_id: 'MDQ6VXNlcjQzNTgxNw==',
          avatar_url: 'https://avatars2.githubusercontent.com/u/435817?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/derolf',
          html_url: 'https://github.com/derolf',
          followers_url: 'https://api.github.com/users/derolf/followers',
          following_url:
            'https://api.github.com/users/derolf/following{/other_user}',
          gists_url: 'https://api.github.com/users/derolf/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/derolf/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/derolf/subscriptions',
          organizations_url: 'https://api.github.com/users/derolf/orgs',
          repos_url: 'https://api.github.com/users/derolf/repos',
          events_url: 'https://api.github.com/users/derolf/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/derolf/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 710573595,
            node_id: 'MDU6TGFiZWw3MTA1NzM1OTU=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools',
            name: 'Component: Developer Tools',
            color: 'fbca04',
            default: false,
            description: null,
          },
          {
            id: 710375792,
            node_id: 'MDU6TGFiZWw3MTAzNzU3OTI=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Type:%20Discussion',
            name: 'Type: Discussion',
            color: 'fef2c0',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 7,
        created_at: '2020-09-23T12:18:50Z',
        updated_at: '2020-09-24T20:06:29Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'React allows to develop custom reconcilers. However, currently it is not possible to display custom debug information about the generated Instances in the react DevTools.\r\n\r\nTherefore, I propose to introduce two functions into `HostConfig`:\r\n\r\n```TypeScript\r\n  getInstanceDebugInfo?: (instance: Instance) => any;\r\n  getTextInstanceDebugInfo?: (textInstance: TextInstance) => any\r\n```\r\n\r\nThey should return an object with custom debug information that would be shown in DevTools whenever an Instance-backed Component is highlighted.',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19887',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19887/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19887/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19887/events',
        html_url: 'https://github.com/facebook/react/issues/19887',
        id: 706702738,
        node_id: 'MDU6SXNzdWU3MDY3MDI3Mzg=',
        number: 19887,
        title:
          'Feature request: dealing with dependencies in custom React hooks',
        user: {
          login: 'Patrick-DS',
          id: 28736507,
          node_id: 'MDQ6VXNlcjI4NzM2NTA3',
          avatar_url: 'https://avatars2.githubusercontent.com/u/28736507?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/Patrick-DS',
          html_url: 'https://github.com/Patrick-DS',
          followers_url: 'https://api.github.com/users/Patrick-DS/followers',
          following_url:
            'https://api.github.com/users/Patrick-DS/following{/other_user}',
          gists_url: 'https://api.github.com/users/Patrick-DS/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/Patrick-DS/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/Patrick-DS/subscriptions',
          organizations_url: 'https://api.github.com/users/Patrick-DS/orgs',
          repos_url: 'https://api.github.com/users/Patrick-DS/repos',
          events_url:
            'https://api.github.com/users/Patrick-DS/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/Patrick-DS/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 1,
        created_at: '2020-09-22T21:23:34Z',
        updated_at: '2020-09-25T16:44:57Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          "Let's suppose that I'm trying to define a custom hook using useEffect (the same comment applies for other hooks relying on dependencies such as useCallback, useMemo, useLayoutEffect, etc...):\r\n\r\n```\r\nimport {useEffect} from \"react\"\r\n\r\nexport const useWindowScroll = (dependencies) => {\r\n  useEffect(() => {\r\n    window.scrollTo(0,0)\r\n  }, dependencies)\r\n}\r\n```\r\n\r\nThis would be the ideal code to write to make this hook re-usable:\r\n- It encapsulates the exact business logic, which is to scroll back to the top of the page when one of the dependencies change\r\n- It works using similar syntax to a standard React hook, so provides a nice interface to the developer\r\n- It's as simple as it gets: do the exact thing you've always been doing with the standard hooks. \r\n\r\nHowever, this leads to problems because React complains about the 'dependencies' array. There are different ways one could go about solving this, but they all feel sort of hacky and unnatural to me, one of them being replacing 'dependencies' by 'JSON.stringify(dependencies)' (suggested by Dan Abramov according to a quote I cannot find anymore). It works, but it looks strange to remember that this trick needs to be done.\r\n\r\nSomething else that would also be practical would be to be able to write [someOtherVariable, ...dependencies] in that second argument of a useEffect/useCallback/use(...), without having to wrap it in a JSON.stringify.\r\n\r\nIs there anything that we could do in React itself to make the API for custom hooks simpler when it comes to dependencies? ",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19883',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19883/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19883/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19883/events',
        html_url: 'https://github.com/facebook/react/issues/19883',
        id: 706310462,
        node_id: 'MDU6SXNzdWU3MDYzMTA0NjI=',
        number: 19883,
        title:
          'eslint-plugin-react-hooks feature request: enforce naming convention for useState()',
        user: {
          login: 'mbrowne',
          id: 874316,
          node_id: 'MDQ6VXNlcjg3NDMxNg==',
          avatar_url: 'https://avatars0.githubusercontent.com/u/874316?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/mbrowne',
          html_url: 'https://github.com/mbrowne',
          followers_url: 'https://api.github.com/users/mbrowne/followers',
          following_url:
            'https://api.github.com/users/mbrowne/following{/other_user}',
          gists_url: 'https://api.github.com/users/mbrowne/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/mbrowne/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/mbrowne/subscriptions',
          organizations_url: 'https://api.github.com/users/mbrowne/orgs',
          repos_url: 'https://api.github.com/users/mbrowne/repos',
          events_url: 'https://api.github.com/users/mbrowne/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/mbrowne/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 2,
        created_at: '2020-09-22T11:44:30Z',
        updated_at: '2020-09-23T08:43:48Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          "<!--\r\n  Note: if the issue is about documentation or the website, please file it at:\r\n  https://github.com/reactjs/reactjs.org/issues/new\r\n-->\r\n(Re-opening https://github.com/facebook/react/issues/16908)\r\n\r\n**Do you want to request a *feature* or report a *bug*?**\r\nFeature\r\n\r\n**What is the current behavior?**\r\n\r\nThere is currently no rule to enforce the standard naming convention for `useState`.\r\n\r\n**What is the expected behavior?**\r\n\r\nIt would be great to have a rule to enforce the standard naming convention for `useState()`:\r\n\r\n```\r\nconst [x, setX] = useState(...)\r\n```\r\n\r\nFor example, the rule would consider this an error:\r\n\r\n```\r\nconst [x, setFoo] = useState(...)\r\n```\r\n\r\nThis would ensure that all useState variables followed the same convention, i.e. `${varName}` and `set${upperFirstVarName}`.\r\n\r\n**Which versions of React, and which browser / OS are affected by this issue? Did this work in previous versions of React?**\r\n\r\nAll versions with hooks\r\n\r\n**Note**\r\n\r\nI originally submitted a feature request for eslint-plugin-react: https://github.com/yannickcr/eslint-plugin-react/issues/2417. It was suggested that I make the feature request here instead. I'm not sure which plugin would be the more appropriate place for this.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19881',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19881/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19881/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19881/events',
        html_url: 'https://github.com/facebook/react/pull/19881',
        id: 705971378,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDkwNjA0OTI3',
        number: 19881,
        title:
          '[Not for merge yet] Merge the new reconciler fork into the old one',
        user: {
          login: 'gaearon',
          id: 810438,
          node_id: 'MDQ6VXNlcjgxMDQzOA==',
          avatar_url: 'https://avatars0.githubusercontent.com/u/810438?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/gaearon',
          html_url: 'https://github.com/gaearon',
          followers_url: 'https://api.github.com/users/gaearon/followers',
          following_url:
            'https://api.github.com/users/gaearon/following{/other_user}',
          gists_url: 'https://api.github.com/users/gaearon/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/gaearon/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/gaearon/subscriptions',
          organizations_url: 'https://api.github.com/users/gaearon/orgs',
          repos_url: 'https://api.github.com/users/gaearon/repos',
          events_url: 'https://api.github.com/users/gaearon/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/gaearon/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 1775958285,
            node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
            url:
              'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
            name: 'React Core Team',
            color: '9149d1',
            default: false,
            description: 'Opened by a member of the React Core Team',
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 3,
        created_at: '2020-09-21T23:06:42Z',
        updated_at: '2020-09-22T00:28:23Z',
        closed_at: null,
        author_association: 'MEMBER',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19881',
          html_url: 'https://github.com/facebook/react/pull/19881',
          diff_url: 'https://github.com/facebook/react/pull/19881.diff',
          patch_url: 'https://github.com/facebook/react/pull/19881.patch',
        },
        body:
          "This is for the npm release. We can't flip the flag, instead we need to replace the fork.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19879',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19879/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19879/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19879/events',
        html_url: 'https://github.com/facebook/react/issues/19879',
        id: 705776611,
        node_id: 'MDU6SXNzdWU3MDU3NzY2MTE=',
        number: 19879,
        title:
          'lazy state initiation in nested component is called multiple times when promises/resources resolve fast and called only once when promises/resources resolve slowBug: ',
        user: {
          login: 'sultanarif-p',
          id: 53237271,
          node_id: 'MDQ6VXNlcjUzMjM3Mjcx',
          avatar_url: 'https://avatars1.githubusercontent.com/u/53237271?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/sultanarif-p',
          html_url: 'https://github.com/sultanarif-p',
          followers_url: 'https://api.github.com/users/sultanarif-p/followers',
          following_url:
            'https://api.github.com/users/sultanarif-p/following{/other_user}',
          gists_url:
            'https://api.github.com/users/sultanarif-p/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/sultanarif-p/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/sultanarif-p/subscriptions',
          organizations_url: 'https://api.github.com/users/sultanarif-p/orgs',
          repos_url: 'https://api.github.com/users/sultanarif-p/repos',
          events_url:
            'https://api.github.com/users/sultanarif-p/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/sultanarif-p/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 1,
        created_at: '2020-09-21T17:14:56Z',
        updated_at: '2020-09-21T17:47:25Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          "<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\n\r\nReact version:\r\n\r\n## Steps To Reproduce\r\n\r\n1.\r\n2.\r\n\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn't\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example:\r\n\r\n<!--\r\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\r\n  repository on GitHub, or provide a minimal code example that reproduces the\r\n  problem. You may provide a screenshot of the application if you think it is\r\n  relevant to your bug report. Here are some tips for providing a minimal\r\n  example: https://stackoverflow.com/help/mcve.\r\n-->\r\n\r\n## The current behavior\r\n\r\nlazy state initiation in nested component is called multiple times when promises/resources resolve fast\r\nand called only once when promises/resources resolve slow\r\n## The expected behavior\r\n",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19870',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19870/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19870/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19870/events',
        html_url: 'https://github.com/facebook/react/issues/19870',
        id: 705091708,
        node_id: 'MDU6SXNzdWU3MDUwOTE3MDg=',
        number: 19870,
        title: 'Bug: Nested Suspense not catching fast resolved Promises',
        user: {
          login: 'Xiphe',
          id: 911218,
          node_id: 'MDQ6VXNlcjkxMTIxOA==',
          avatar_url: 'https://avatars1.githubusercontent.com/u/911218?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/Xiphe',
          html_url: 'https://github.com/Xiphe',
          followers_url: 'https://api.github.com/users/Xiphe/followers',
          following_url:
            'https://api.github.com/users/Xiphe/following{/other_user}',
          gists_url: 'https://api.github.com/users/Xiphe/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/Xiphe/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/Xiphe/subscriptions',
          organizations_url: 'https://api.github.com/users/Xiphe/orgs',
          repos_url: 'https://api.github.com/users/Xiphe/repos',
          events_url: 'https://api.github.com/users/Xiphe/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/Xiphe/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 1205087127,
            node_id: 'MDU6TGFiZWwxMjA1MDg3MTI3',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Concurrent%20Mode',
            name: 'Component: Concurrent Mode',
            color: 'ffccd3',
            default: false,
            description: '',
          },
          {
            id: 1109407645,
            node_id: 'MDU6TGFiZWwxMTA5NDA3NjQ1',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Suspense',
            name: 'Component: Suspense',
            color: '8ffcd6',
            default: false,
            description: '',
          },
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 3,
        created_at: '2020-09-20T11:17:47Z',
        updated_at: '2020-09-23T12:09:36Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'Given I have two resources stored and initiated in the `useState` of two nested components.\r\nAnd both components have a `<Suspense>` \r\nAnd the resources are read by child components rendered within these Suspense-Boundaries.\r\n\r\nThen I expect both resources to just be created once\r\nAnd I expect the thrown promises to be captured by the closest `<Suspense>`\r\n\r\n⚠️  But when the resources resolve within ~10ms\r\nThen the inner resource is created more then once (i\'ve seen up to 80 creations)\r\nAnd the inner `<Suspense>` seems to be ignored\r\n\r\n\r\nReact version: 0.0.0-experimental-94c0244ba\r\n\r\n\r\n## Steps To Reproduce\r\n\r\n1. Go to: https://codesandbox.io/s/quirky-bassi-1mbt7?file=/src/index.js\r\n2. Open the console\r\n3. Run the code\r\n4. Observe multiple "CREATE SUB RES (with INIT) " logs\r\n5. set `DELAY` in line 7 to `1000` or greater\r\n6. Rerun the code\r\n7. Observe only one "CREATE SUB RES (with INIT)"\r\n\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn\'t\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example:\r\n\r\nhttps://codesandbox.io/s/quirky-bassi-1mbt7?file=/src/index.js\r\n\r\n\r\n## The current behavior\r\n\r\nlazy state initiation in nested component is called multiple times when promises/resources resolve fast\r\nand called only once when promises/resources resolve slow\r\n\r\n## The expected behavior\r\n\r\nno change in behaviour weather the promises/resources resolve fast or not\r\n\r\n---\r\n\r\nNot sure if this maybe is intended and meant to prevent UI flickering / loading-waterfalls.\r\nOr I am not supposed to create resources in lazy state initiations\r\n\r\nIn both cases I\'d love to see deep docs about the why and how I am supposed to setup my resources.',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19869',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19869/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19869/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19869/events',
        html_url: 'https://github.com/facebook/react/pull/19869',
        id: 705088432,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDg5ODg4MTg2',
        number: 19869,
        title:
          'eslint-plugin-react-hooks: JSX support for react-hooks/exhaustive-deps (#18051)',
        user: {
          login: 'chrstnv',
          id: 17298953,
          node_id: 'MDQ6VXNlcjE3Mjk4OTUz',
          avatar_url: 'https://avatars3.githubusercontent.com/u/17298953?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/chrstnv',
          html_url: 'https://github.com/chrstnv',
          followers_url: 'https://api.github.com/users/chrstnv/followers',
          following_url:
            'https://api.github.com/users/chrstnv/following{/other_user}',
          gists_url: 'https://api.github.com/users/chrstnv/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/chrstnv/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/chrstnv/subscriptions',
          organizations_url: 'https://api.github.com/users/chrstnv/orgs',
          repos_url: 'https://api.github.com/users/chrstnv/repos',
          events_url: 'https://api.github.com/users/chrstnv/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/chrstnv/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 4,
        created_at: '2020-09-20T10:56:02Z',
        updated_at: '2020-09-23T22:20:58Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19869',
          html_url: 'https://github.com/facebook/react/pull/19869',
          diff_url: 'https://github.com/facebook/react/pull/19869.diff',
          patch_url: 'https://github.com/facebook/react/pull/19869.patch',
        },
        body:
          "## Summary\r\n\r\n#18051\r\n\r\nAs mentioned in the [discussion](https://github.com/eslint/eslint-scope/issues/61), ESLint does not implement React-specific logic, and therefore JSX Identifiers will not be treated by ESLint as regular variables with references to them in scopes.\r\n\r\nBecause of this circumstance, when we collect hook callback dependencies, JSX variables don't end up in the list of dependencies and JSX-component variables declared in the hook dependencies array are considered exhaustive, but they are not.\r\n\r\nSo I implemented a prototype of a possible solution to this problem — handling JSX-expressions in the dependency gathering logic of the plugin.\r\n\r\nIn a nutshell, if JSX is found in the callback hook, then I traverse the JSX tree of elements and collect a list of React components. In the process, I filter out all elements that are not React components. Then I add the resulting array to the list of collected dependencies, which will be checked for exhaustiveness or lack of dependencies.\r\n\r\nMy prototype solution is imperfect at the moment, it doesn't find JSX-expressions in if/else constructions, it does not fully support JSXMemberExpressions, I have not yet written Typescript tests, etc. But I will do my best if I know that this is the right way.\r\n\r\nThanks!\r\n\r\n## Test Plan\r\n✅ All test, test-prod, lint, flow checks are passed.\r\nAdded some new tests for positive and negative cases of JSX support.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19867',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19867/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19867/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19867/events',
        html_url: 'https://github.com/facebook/react/pull/19867',
        id: 705003926,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDg5ODI3MjQ0',
        number: 19867,
        title:
          'Bug: Handling of symbols when used as deps incorrectly to create error message results in an unrelated TypeError: Cannot convert a Symbol value to a string ',
        user: {
          login: 'omarsy',
          id: 15034695,
          node_id: 'MDQ6VXNlcjE1MDM0Njk1',
          avatar_url: 'https://avatars0.githubusercontent.com/u/15034695?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/omarsy',
          html_url: 'https://github.com/omarsy',
          followers_url: 'https://api.github.com/users/omarsy/followers',
          following_url:
            'https://api.github.com/users/omarsy/following{/other_user}',
          gists_url: 'https://api.github.com/users/omarsy/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/omarsy/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/omarsy/subscriptions',
          organizations_url: 'https://api.github.com/users/omarsy/orgs',
          repos_url: 'https://api.github.com/users/omarsy/repos',
          events_url: 'https://api.github.com/users/omarsy/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/omarsy/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 3,
        created_at: '2020-09-19T21:54:25Z',
        updated_at: '2020-09-19T22:18:24Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19867',
          html_url: 'https://github.com/facebook/react/pull/19867',
          diff_url: 'https://github.com/facebook/react/pull/19867.diff',
          patch_url: 'https://github.com/facebook/react/pull/19867.patch',
        },
        body:
          '<!--\r\n  Thanks for submitting a pull request!\r\n  We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory.\r\n\r\n  Before submitting a pull request, please make sure the following is done:\r\n\r\n  1. Fork [the repository](https://github.com/facebook/react) and create your branch from `master`.\r\n  2. Run `yarn` in the repository root.\r\n  3. If you\'ve fixed a bug or added code that should be tested, add tests!\r\n  4. Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.\r\n  5. Run `yarn test-prod` to test in the production environment. It supports the same options as `yarn test`.\r\n  6. If you need a debugger, run `yarn debug-test --watch TestName`, open `chrome://inspect`, and press "Inspect".\r\n  7. Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).\r\n  8. Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.\r\n  9. Run the [Flow](https://flowtype.org/) type checks (`yarn flow`).\r\n  10. If you haven\'t already, complete the CLA.\r\n\r\n  Learn more about contributing: https://reactjs.org/docs/how-to-contribute.html\r\n-->\r\nFixes #19848\r\n## Summary\r\n![image](https://user-images.githubusercontent.com/15034695/93689994-0c06bb80-fad4-11ea-8da5-422408772782.png)\r\n\r\n<!-- Explain the **motivation** for making this change. What existing problem does the pull request solve? -->\r\n\r\n## Test Plan\r\n\r\n<!-- Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes the user interface. -->\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19865',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19865/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19865/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19865/events',
        html_url: 'https://github.com/facebook/react/issues/19865',
        id: 704675708,
        node_id: 'MDU6SXNzdWU3MDQ2NzU3MDg=',
        number: 19865,
        title:
          'Removal of <script> functionality needs to be added to https://reactjs.org/docs/ and a warning displayed while in development mode.',
        user: {
          login: 'infoeon',
          id: 6994751,
          node_id: 'MDQ6VXNlcjY5OTQ3NTE=',
          avatar_url: 'https://avatars2.githubusercontent.com/u/6994751?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/infoeon',
          html_url: 'https://github.com/infoeon',
          followers_url: 'https://api.github.com/users/infoeon/followers',
          following_url:
            'https://api.github.com/users/infoeon/following{/other_user}',
          gists_url: 'https://api.github.com/users/infoeon/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/infoeon/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/infoeon/subscriptions',
          organizations_url: 'https://api.github.com/users/infoeon/orgs',
          repos_url: 'https://api.github.com/users/infoeon/repos',
          events_url: 'https://api.github.com/users/infoeon/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/infoeon/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 710375792,
            node_id: 'MDU6TGFiZWw3MTAzNzU3OTI=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Type:%20Discussion',
            name: 'Type: Discussion',
            color: 'fef2c0',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 1,
        created_at: '2020-09-18T21:44:45Z',
        updated_at: '2020-09-19T02:20:15Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'When a <script> tag is used within JSX there is functionality that tricks the browser into not executing the contained code or from fetching the `src`. There is a code comment indicating this behaviour:\r\n\r\n`Create the script via .innerHTML so its "parser-inserted" flag is set to true and it does not execute`\r\n\r\nbut for those who are expecting the tag to work like _every other html tag_ in React it is a bit of a surprise that wastes several hours tracking down the cause.  This "feature" is obviously there for security reasons, but there are numerous ways around it (changing the case of a letter such as <sCript src="...">).\r\n\r\nPlease either remove this feature and add a warning while in dev mode stating that adding <script> tags is not best practices, or keep the feature but warn that <script> tags are not supported inline and document this behaviour in the React docs. I personally recommend the first once since it simplifies the React code base while allowing the developer to still proceed at their own risk.  The "risk" is minor since this isn\'t readily exploitable as the dangerouslySetHtml feature.\r\n\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19860',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19860/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19860/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19860/events',
        html_url: 'https://github.com/facebook/react/issues/19860',
        id: 704377236,
        node_id: 'MDU6SXNzdWU3MDQzNzcyMzY=',
        number: 19860,
        title: 'Bug: input[type="radio"] cannot be readOnly',
        user: {
          login: 'eps1lon',
          id: 12292047,
          node_id: 'MDQ6VXNlcjEyMjkyMDQ3',
          avatar_url: 'https://avatars3.githubusercontent.com/u/12292047?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/eps1lon',
          html_url: 'https://github.com/eps1lon',
          followers_url: 'https://api.github.com/users/eps1lon/followers',
          following_url:
            'https://api.github.com/users/eps1lon/following{/other_user}',
          gists_url: 'https://api.github.com/users/eps1lon/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/eps1lon/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/eps1lon/subscriptions',
          organizations_url: 'https://api.github.com/users/eps1lon/orgs',
          repos_url: 'https://api.github.com/users/eps1lon/repos',
          events_url: 'https://api.github.com/users/eps1lon/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/eps1lon/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 2,
        created_at: '2020-09-18T13:26:15Z',
        updated_at: '2020-09-23T07:45:14Z',
        closed_at: null,
        author_association: 'COLLABORATOR',
        active_lock_reason: null,
        body:
          '\r\n\r\nReact version: 16.13.1 and 17.0.0-alpha.0-2d131d782\r\n\r\n## Steps To Reproduce\r\n\r\n1. Render two `input[type="radio"][name="radio"]`: one is checked, one isn\'t\r\n2. Get warning about passing `onChange` or `readOnly`\r\n3. Add empty `onChange` to both\r\n\r\nLink to code example:\r\n\r\n- [React 16 repro](https://codesandbox.io/s/react-16-radio-cannot-be-read-only-z9ldc)\r\n- [React 17 repro](https://codesandbox.io/s/react-17-radio-cannot-be-read-only-forked-r6m9r)\r\n\r\n## The current behavior\r\n\r\n![screencapture of the described behavior](https://i.ibb.co/CMGcrSH/react-readonly-radio.gif)\r\n\r\n1. React recommends `readOnly` for `input[type="radio"]` even though this isn\'t supported natively (though React could polyfill it)\r\n2. After looping through the radios once with arrow key navigation the checked state changes\r\n\r\n## The expected behavior\r\n\r\nArrow key navigation shouldn\'t break out of the controlled value. It\'s debateable whether React should recommend `readOnly` when this isn\'t a standard attribute like `readOnly` for `<input type="text" />`.\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19857',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19857/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19857/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19857/events',
        html_url: 'https://github.com/facebook/react/issues/19857',
        id: 704225352,
        node_id: 'MDU6SXNzdWU3MDQyMjUzNTI=',
        number: 19857,
        title: 'Bug: React Portals - Memory Leak',
        user: {
          login: 'seanlandsman',
          id: 1329081,
          node_id: 'MDQ6VXNlcjEzMjkwODE=',
          avatar_url: 'https://avatars0.githubusercontent.com/u/1329081?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/seanlandsman',
          html_url: 'https://github.com/seanlandsman',
          followers_url: 'https://api.github.com/users/seanlandsman/followers',
          following_url:
            'https://api.github.com/users/seanlandsman/following{/other_user}',
          gists_url:
            'https://api.github.com/users/seanlandsman/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/seanlandsman/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/seanlandsman/subscriptions',
          organizations_url: 'https://api.github.com/users/seanlandsman/orgs',
          repos_url: 'https://api.github.com/users/seanlandsman/repos',
          events_url:
            'https://api.github.com/users/seanlandsman/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/seanlandsman/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 0,
        created_at: '2020-09-18T09:19:11Z',
        updated_at: '2020-09-18T09:19:11Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          '\r\nWe use React and interact with a 3rd party JS library - we use React Portals to create & destroy React Components within the overall application.\r\n\r\nThe supplied repo demonstrates a very simplified version of what we do - after destroying/cleaning up components and detached HTML elements still remain in memory.\r\n\r\nReact version: 16.3.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Check out https://github.com/seanlandsman/react-portal-memory-leak.git\r\n2. take a snapshot (or several until the memory footprint stabilises)\r\n3. click "Create Portal"\r\n4. click "Delete Portal"\r\n5. If you now take another snapshot and compare against the first one you\'ll see a "Detached HTMLDivElement", as well as the supplied "TestComponent"\r\n\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn\'t\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example: https://github.com/seanlandsman/react-portal-memory-leak.git\r\n\r\n<!--\r\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\r\n  repository on GitHub, or provide a minimal code example that reproduces the\r\n  problem. You may provide a screenshot of the application if you think it is\r\n  relevant to your bug report. Here are some tips for providing a minimal\r\n  example: https://stackoverflow.com/help/mcve.\r\n-->\r\n\r\n## The current behavior\r\n\r\nPost forceUpdate components and HTML elements remain in memory.\r\n\r\n## The expected behavior\r\n\r\nMemory before and after create/destroy(update) should be the same\r\n',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19855',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19855/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19855/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19855/events',
        html_url: 'https://github.com/facebook/react/pull/19855',
        id: 704012652,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDg5MDEzNTI2',
        number: 19855,
        title: "Automatically stringify keys with type of 'symbol'",
        user: {
          login: 'bpernick',
          id: 57197898,
          node_id: 'MDQ6VXNlcjU3MTk3ODk4',
          avatar_url: 'https://avatars1.githubusercontent.com/u/57197898?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/bpernick',
          html_url: 'https://github.com/bpernick',
          followers_url: 'https://api.github.com/users/bpernick/followers',
          following_url:
            'https://api.github.com/users/bpernick/following{/other_user}',
          gists_url: 'https://api.github.com/users/bpernick/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/bpernick/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/bpernick/subscriptions',
          organizations_url: 'https://api.github.com/users/bpernick/orgs',
          repos_url: 'https://api.github.com/users/bpernick/repos',
          events_url: 'https://api.github.com/users/bpernick/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/bpernick/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 6,
        created_at: '2020-09-18T01:29:37Z',
        updated_at: '2020-09-24T23:58:33Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19855',
          html_url: 'https://github.com/facebook/react/pull/19855',
          diff_url: 'https://github.com/facebook/react/pull/19855.diff',
          patch_url: 'https://github.com/facebook/react/pull/19855.patch',
        },
        body:
          "\r\n\r\n## Summary\r\n\r\nAddresses #19851.\r\n\r\nCurrently using a symbol as a unique key causes a cryptic-ish error.\r\n\r\nNow Symbol keys are stringified just like number keys, etc.\r\nSymbol keys don't automatically crash the app.\r\nIf the dev does something bad, like \" return (<><div key={ Symbol('foo') } ><div key={ Symbol('foo') } ></> \", they will get a descriptive error about duplicate keys.\r\n\r\n## Test Plan\r\nI ran yarn test and yarn test-prod.\r\n",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19851',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19851/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19851/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19851/events',
        html_url: 'https://github.com/facebook/react/issues/19851',
        id: 703804545,
        node_id: 'MDU6SXNzdWU3MDM4MDQ1NDU=',
        number: 19851,
        title: 'Bug:  Component with a Symbol as key, causes Crash',
        user: {
          login: 'omarsy',
          id: 15034695,
          node_id: 'MDQ6VXNlcjE1MDM0Njk1',
          avatar_url: 'https://avatars0.githubusercontent.com/u/15034695?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/omarsy',
          html_url: 'https://github.com/omarsy',
          followers_url: 'https://api.github.com/users/omarsy/followers',
          following_url:
            'https://api.github.com/users/omarsy/following{/other_user}',
          gists_url: 'https://api.github.com/users/omarsy/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/omarsy/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/omarsy/subscriptions',
          organizations_url: 'https://api.github.com/users/omarsy/orgs',
          repos_url: 'https://api.github.com/users/omarsy/repos',
          events_url: 'https://api.github.com/users/omarsy/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/omarsy/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 710375792,
            node_id: 'MDU6TGFiZWw3MTAzNzU3OTI=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Type:%20Discussion',
            name: 'Type: Discussion',
            color: 'fef2c0',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 16,
        created_at: '2020-09-17T18:14:16Z',
        updated_at: '2020-09-24T21:07:18Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        body:
          "<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\n\r\nReact version:\r\n16.13.1\r\n# Steps To Reproduce\r\n\r\n1. Go To the link https://codesandbox.io/s/happy-ramanujan-xlegp?file=/src/App.js\r\n2. We can see errors caused by this part of code: https://github.com/facebook/react/blob/6fddca27e75950adda92ab4f4946442907dc3bb7/packages/react/src/ReactElement.js#L228\r\n\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn't\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example:\r\nhttps://codesandbox.io/s/happy-ramanujan-xlegp?file=/src/App.js\r\n<!--\r\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\r\n  repository on GitHub, or provide a minimal code example that reproduces the\r\n  problem. You may provide a screenshot of the application if you think it is\r\n  relevant to your bug report. Here are some tips for providing a minimal\r\n  example: https://stackoverflow.com/help/mcve.\r\n-->\r\n\r\n## The current behavior\r\nCrash\r\n## The expected behavior\r\nNo crash\r\n",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19848',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19848/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19848/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19848/events',
        html_url: 'https://github.com/facebook/react/issues/19848',
        id: 703600132,
        node_id: 'MDU6SXNzdWU3MDM2MDAxMzI=',
        number: 19848,
        title:
          'Bug: Handling of symbols when used as deps incorrectly to create error message results in an unrelated TypeError: Cannot convert a Symbol value to a string',
        user: {
          login: 'leidegre',
          id: 63085,
          node_id: 'MDQ6VXNlcjYzMDg1',
          avatar_url: 'https://avatars2.githubusercontent.com/u/63085?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/leidegre',
          html_url: 'https://github.com/leidegre',
          followers_url: 'https://api.github.com/users/leidegre/followers',
          following_url:
            'https://api.github.com/users/leidegre/following{/other_user}',
          gists_url: 'https://api.github.com/users/leidegre/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/leidegre/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/leidegre/subscriptions',
          organizations_url: 'https://api.github.com/users/leidegre/orgs',
          repos_url: 'https://api.github.com/users/leidegre/repos',
          events_url: 'https://api.github.com/users/leidegre/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/leidegre/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 1109410193,
            node_id: 'MDU6TGFiZWwxMTA5NDEwMTkz',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Hooks',
            name: 'Component: Hooks',
            color: 'c2f27b',
            default: false,
            description: '',
          },
          {
            id: 40929151,
            node_id: 'MDU6TGFiZWw0MDkyOTE1MQ==',
            url:
              'https://api.github.com/repos/facebook/react/labels/Type:%20Bug',
            name: 'Type: Bug',
            color: 'b60205',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: {
          login: 'omarsy',
          id: 15034695,
          node_id: 'MDQ6VXNlcjE1MDM0Njk1',
          avatar_url: 'https://avatars0.githubusercontent.com/u/15034695?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/omarsy',
          html_url: 'https://github.com/omarsy',
          followers_url: 'https://api.github.com/users/omarsy/followers',
          following_url:
            'https://api.github.com/users/omarsy/following{/other_user}',
          gists_url: 'https://api.github.com/users/omarsy/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/omarsy/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/omarsy/subscriptions',
          organizations_url: 'https://api.github.com/users/omarsy/orgs',
          repos_url: 'https://api.github.com/users/omarsy/repos',
          events_url: 'https://api.github.com/users/omarsy/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/omarsy/received_events',
          type: 'User',
          site_admin: false,
        },
        assignees: [
          {
            login: 'omarsy',
            id: 15034695,
            node_id: 'MDQ6VXNlcjE1MDM0Njk1',
            avatar_url: 'https://avatars0.githubusercontent.com/u/15034695?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/omarsy',
            html_url: 'https://github.com/omarsy',
            followers_url: 'https://api.github.com/users/omarsy/followers',
            following_url:
              'https://api.github.com/users/omarsy/following{/other_user}',
            gists_url: 'https://api.github.com/users/omarsy/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/omarsy/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/omarsy/subscriptions',
            organizations_url: 'https://api.github.com/users/omarsy/orgs',
            repos_url: 'https://api.github.com/users/omarsy/repos',
            events_url: 'https://api.github.com/users/omarsy/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/omarsy/received_events',
            type: 'User',
            site_admin: false,
          },
        ],
        milestone: null,
        comments: 6,
        created_at: '2020-09-17T13:40:58Z',
        updated_at: '2020-09-18T06:27:21Z',
        closed_at: null,
        author_association: 'CONTRIBUTOR',
        active_lock_reason: null,
        body:
          "React version: 16.3.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Click the button in this Code Sandbox https://codesandbox.io/s/blissful-sun-e0lle?file=/src/App.js\r\n\r\n## The current behavior\r\n\r\nThe wrong error is generated\r\n\r\n## The expected behavior\r\n\r\nAn error should still be generated but the error message should be correct. The problem is that if you do `[Symbol('...')].join(',')` JavaScript will freak out which is what happens if you put symbols incorrectly in the deps to hooks.",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19846',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19846/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19846/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19846/events',
        html_url: 'https://github.com/facebook/react/issues/19846',
        id: 703287683,
        node_id: 'MDU6SXNzdWU3MDMyODc2ODM=',
        number: 19846,
        title:
          "Bug: manually created 'change' events via new Event() don't trigger React event handlers",
        user: {
          login: 'jesseko',
          id: 153062,
          node_id: 'MDQ6VXNlcjE1MzA2Mg==',
          avatar_url: 'https://avatars0.githubusercontent.com/u/153062?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/jesseko',
          html_url: 'https://github.com/jesseko',
          followers_url: 'https://api.github.com/users/jesseko/followers',
          following_url:
            'https://api.github.com/users/jesseko/following{/other_user}',
          gists_url: 'https://api.github.com/users/jesseko/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/jesseko/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/jesseko/subscriptions',
          organizations_url: 'https://api.github.com/users/jesseko/orgs',
          repos_url: 'https://api.github.com/users/jesseko/repos',
          events_url: 'https://api.github.com/users/jesseko/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/jesseko/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 9,
        created_at: '2020-09-17T05:48:34Z',
        updated_at: '2020-09-22T09:10:36Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          "## Description:\r\nManually created events created via `new Event` and emitted from a hidden input work great for `'input'` events, they bubble as expected and can be caught via `onInput` handlers, but using `'change'` events this way doesn't work -- `onChange` handlers are never called.\r\n\r\nThe vanilla JS `'change'` events do bubble normally and can be caught by parents with vanilla JS listeners ( using `addEventListener`), but the React `onChange` listeners don't register anything. \r\n\r\nI've created a codepen to demonstrate a minimal case for this via console logging.  See repro steps below and code comments for additional details.\r\n\r\n### React version: 16.13.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Open https://codepen.io/jesseko/pen/dyMqGKG\r\n2. Observe that logging shows a single entry, the `change` event being emitted from a child component after render.  We expect a second log from a parent's `onChange` but it never comes.\r\n3. Change `EVENT_TYPE` to `'input'`\r\n4. Observe that logging shows two entries, one for the event being emitted and a second for it being detected via an `onInput` handler in the parent component.\r\n5. optional: there's some commented out code at the bottom to test a vanilla JS listener.  Change `EVENT_TYPE` back to `'change'` and uncomment that code and you'll see that that listener does work\r\n\r\n",
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19845',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19845/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19845/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19845/events',
        html_url: 'https://github.com/facebook/react/pull/19845',
        id: 703115012,
        node_id: 'MDExOlB1bGxSZXF1ZXN0NDg4Mjc3Mjcy',
        number: 19845,
        title: 'Continuations should yield after the deadline',
        user: {
          login: 'rickhanlonii',
          id: 2440089,
          node_id: 'MDQ6VXNlcjI0NDAwODk=',
          avatar_url: 'https://avatars0.githubusercontent.com/u/2440089?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/rickhanlonii',
          html_url: 'https://github.com/rickhanlonii',
          followers_url: 'https://api.github.com/users/rickhanlonii/followers',
          following_url:
            'https://api.github.com/users/rickhanlonii/following{/other_user}',
          gists_url:
            'https://api.github.com/users/rickhanlonii/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/rickhanlonii/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/rickhanlonii/subscriptions',
          organizations_url: 'https://api.github.com/users/rickhanlonii/orgs',
          repos_url: 'https://api.github.com/users/rickhanlonii/repos',
          events_url:
            'https://api.github.com/users/rickhanlonii/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/rickhanlonii/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 196858374,
            node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
            url:
              'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
            name: 'CLA Signed',
            color: 'e7e7e7',
            default: false,
            description: null,
          },
          {
            id: 1775958285,
            node_id: 'MDU6TGFiZWwxNzc1OTU4Mjg1',
            url:
              'https://api.github.com/repos/facebook/react/labels/React%20Core%20Team',
            name: 'React Core Team',
            color: '9149d1',
            default: false,
            description: 'Opened by a member of the React Core Team',
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 8,
        created_at: '2020-09-16T22:25:53Z',
        updated_at: '2020-09-17T17:41:16Z',
        closed_at: null,
        author_association: 'MEMBER',
        active_lock_reason: null,
        pull_request: {
          url: 'https://api.github.com/repos/facebook/react/pulls/19845',
          html_url: 'https://github.com/facebook/react/pull/19845',
          diff_url: 'https://github.com/facebook/react/pull/19845.diff',
          patch_url: 'https://github.com/facebook/react/pull/19845.patch',
        },
        body:
          '## Summary\r\n\r\nFixes a bug in the scheduler that allowed continuations to starve the event loop (see test).\r\n\r\n## Test Plan\r\n\r\nAdded a test.',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19839',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19839/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19839/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19839/events',
        html_url: 'https://github.com/facebook/react/issues/19839',
        id: 702262617,
        node_id: 'MDU6SXNzdWU3MDIyNjI2MTc=',
        number: 19839,
        title: 'Error: "Maximum call stack size exceeded"',
        user: {
          login: 'mungojam',
          id: 3154635,
          node_id: 'MDQ6VXNlcjMxNTQ2MzU=',
          avatar_url: 'https://avatars1.githubusercontent.com/u/3154635?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/mungojam',
          html_url: 'https://github.com/mungojam',
          followers_url: 'https://api.github.com/users/mungojam/followers',
          following_url:
            'https://api.github.com/users/mungojam/following{/other_user}',
          gists_url: 'https://api.github.com/users/mungojam/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/mungojam/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/mungojam/subscriptions',
          organizations_url: 'https://api.github.com/users/mungojam/orgs',
          repos_url: 'https://api.github.com/users/mungojam/repos',
          events_url: 'https://api.github.com/users/mungojam/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/mungojam/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 710573595,
            node_id: 'MDU6TGFiZWw3MTA1NzM1OTU=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools',
            name: 'Component: Developer Tools',
            color: 'fbca04',
            default: false,
            description: null,
          },
          {
            id: 40929151,
            node_id: 'MDU6TGFiZWw0MDkyOTE1MQ==',
            url:
              'https://api.github.com/repos/facebook/react/labels/Type:%20Bug',
            name: 'Type: Bug',
            color: 'b60205',
            default: false,
            description: null,
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 2,
        created_at: '2020-09-15T20:56:05Z',
        updated_at: '2020-09-23T19:24:40Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'Describe what you were doing when the bug occurred:\r\n1. Clicking back to go back through the frames following a profile session. I think I got to zero and then clicked it again and then it errored\r\n\r\n---------------------------------------------\r\nPlease do not remove the text below this line\r\n---------------------------------------------\r\n\r\nDevTools version: 4.8.2-fed4ae024\r\n\r\nCall stack: at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17661:26)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n    at getCommitTree (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:17710:30)\r\n\r\nComponent stack: at CommitRankedAutoSizer (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:31963:48)\r\n    at div\r\n    at div\r\n    at div\r\n    at SettingsModalContextController (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:26139:23)\r\n    at Profiler_Profiler (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:33363:48)\r\n    at ErrorBoundary (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:27172:5)\r\n    at PortaledContent (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:27303:32)\r\n    at div\r\n    at div\r\n    at ProfilerContextController (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:30463:23)\r\n    at TreeContextController (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:22538:23)\r\n    at SettingsContextController (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:23040:27)\r\n    at ModalDialogContextController (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:28328:23)\r\n    at DevTools_DevTools (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/main.js:33797:21)',
        performed_via_github_app: null,
      },
      {
        url: 'https://api.github.com/repos/facebook/react/issues/19838',
        repository_url: 'https://api.github.com/repos/facebook/react',
        labels_url:
          'https://api.github.com/repos/facebook/react/issues/19838/labels{/name}',
        comments_url:
          'https://api.github.com/repos/facebook/react/issues/19838/comments',
        events_url:
          'https://api.github.com/repos/facebook/react/issues/19838/events',
        html_url: 'https://github.com/facebook/react/issues/19838',
        id: 702122395,
        node_id: 'MDU6SXNzdWU3MDIxMjIzOTU=',
        number: 19838,
        title:
          'Bug: window.onerror handler not invoked on unhandled exception in react rendering',
        user: {
          login: 'RandomEngy',
          id: 9450861,
          node_id: 'MDQ6VXNlcjk0NTA4NjE=',
          avatar_url: 'https://avatars1.githubusercontent.com/u/9450861?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/RandomEngy',
          html_url: 'https://github.com/RandomEngy',
          followers_url: 'https://api.github.com/users/RandomEngy/followers',
          following_url:
            'https://api.github.com/users/RandomEngy/following{/other_user}',
          gists_url: 'https://api.github.com/users/RandomEngy/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/RandomEngy/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/RandomEngy/subscriptions',
          organizations_url: 'https://api.github.com/users/RandomEngy/orgs',
          repos_url: 'https://api.github.com/users/RandomEngy/repos',
          events_url:
            'https://api.github.com/users/RandomEngy/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/RandomEngy/received_events',
          type: 'User',
          site_admin: false,
        },
        labels: [
          {
            id: 155984160,
            node_id: 'MDU6TGFiZWwxNTU5ODQxNjA=',
            url:
              'https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed',
            name: 'Status: Unconfirmed',
            color: 'd4c5f9',
            default: false,
            description:
              "A potential issue that we haven't yet confirmed as a bug",
          },
        ],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 0,
        created_at: '2020-09-15T17:34:07Z',
        updated_at: '2020-09-15T17:34:07Z',
        closed_at: null,
        author_association: 'NONE',
        active_lock_reason: null,
        body:
          'The global JS error handler `window.onerror` is not invoked when there is an unhandled exception in the React rendering pipeline when running in optimized "production" build.\r\n\r\nThough due to special handling, it is fired during a dev build.\r\n\r\n[The documentation](https://reactjs.org/docs/error-boundaries.html) does not seem to indicate what the desired behavior is here. They mention you need such a handler to catch non-react errors but do not say anything about what happens to uncaught react errors. We can work around this by adding an error boundary at the root (in addition to our current `window.onerror` handling), but this seems like unexpected behavior to me.\r\n\r\nReact version: 16.13.1\r\n\r\n## Steps To Reproduce\r\n\r\n1. Set up a global error handler `window.onerror = (message) => { alert(message) };`\r\n2. Throw an exception during react rendering that is not caught by any error boundary\r\n3. Run the production build\r\n\r\nLink to code example:\r\nhttps://github.com/RandomEngy/test-error-boundary\r\n\r\n## The current behavior\r\nHandler is not fired.\r\n\r\n## The expected behavior\r\n`window.onerror` handler fires',
        performed_via_github_app: null,
      },
    ];
    const data = {
      type: FETCH_ISSUES_INFO_FROM_REPO,
      payload: [...issues],
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.data).toEqual(data.payload);
  });
});
