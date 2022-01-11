import { useEffect } from 'react';
import { Sentry } from '@mono-sentry/common';

export function App() {
  useEffect(() => {
    Sentry.init('project-b');
  }, []);

  function throwError() {
    throw new Error('project-b');
  }
  return (
    <>
      <div>Project-B</div>

      <br />
      <div role="navigation">
        <ul>
          <li>
            <button onClick={throwError}>throw new error project b</button>
          </li>
        </ul>
      </div>
      {/* END: routes */}
    </>
  );
}

export default App;
