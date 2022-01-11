import { useEffect } from 'react';
import { Sentry } from '@mono-sentry/common';

export function App() {
  useEffect(() => {
    Sentry.init('project-a');
  }, []);

  function throwError() {
    throw new Error('project-a');
  }
  return (
    <>
      <div>Project-a</div>

      <br />
      <div role="navigation">
        <ul>
          <li>
            <button onClick={throwError}>throw new error project a</button>
          </li>
        </ul>
      </div>
      {/* END: routes */}
    </>
  );
}

export default App;
