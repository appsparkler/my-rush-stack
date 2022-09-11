export const RangesMarkerOptions = (props) => (
  <table className="options-table" {...props}>
    <thead>
      <tr>
        <th>Option</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>element</td>
        <td>string</td>
        <td>"mark"</td>
        <td>
          HTML element to wrap matches, e.g. <code>span</code>
        </td>
      </tr>
      <tr>
        <td>className</td>
        <td>string</td>
        <td>""</td>
        <td>
          A class name that will be appended to <code>element</code>
        </td>
      </tr>
      <tr>
        <td>exclude</td>
        <td>array</td>
        <td>[ ]</td>
        <td>
          An array with exclusion selectors. Matches inside these elements will
          be ignored. Example:
          <code>"filter": ["h1", ".ignore"]</code>
        </td>
      </tr>
      <tr>
        <td>iframes</td>
        <td>boolean</td>
        <td>false</td>
        <td>
          Whether to search also inside iframes. If you don't have permissions
          to some iframes (e.g. because they have a [different origin][SOP])
          they will be silently skipped. If you don't want to search inside
          specific iframes (e.g. facebook share), you can pass an{" "}
          <code>exclude</code> selector that matches these iframes
        </td>
      </tr>
      <tr>
        <td>iframesTimeout</td>
        <td>number</td>
        <td>5000</td>
        <td>
          The maximum ms to wait for a <code>load</code> event before skipping
          an iframe. Especially important when there's no internet connection or
          a browser "offline" mode is enabled and an iframe has an online{" "}
          <code>src</code> – then the <code>load</code> event is never fired
        </td>
      </tr>
      <tr>
        <td>each</td>
        <td>function</td>
        <td></td>
        <td>
          A callback for each marked element. Receives the marked DOM element
          and the corresponding range as a parameter
        </td>
      </tr>
      <tr>
        <td>filter</td>
        <td>function</td>
        <td></td>
        <td>
          A callback to filter or limit matches. It will be called for each
          match and receives the following parameters:
          <ol>
            <li>The text node which includes the range</li>
            <li>The current range</li>
            <li>The extracted term from the matching range</li>
            <li>
              A counter indicating the total number of all marks at the time of
              the function call
            </li>
          </ol>
          The function must return false if the mark should be stopped,
          otherwise true
        </td>
      </tr>
      <tr>
        <td>noMatch</td>
        <td>function</td>
        <td></td>
        <td>
          A callback function that will be called when there are no matches.
          Receives the not found range as a parameter
        </td>
      </tr>
      <tr>
        <td>done</td>
        <td>function</td>
        <td></td>
        <td>
          A callback function after all marks are done. Receives the total
          number of marks as a parameter
        </td>
      </tr>
      <tr>
        <td>debug</td>
        <td>boolean</td>
        <td>false</td>
        <td>
          Set this option to <code>true</code> if you want to log messages
        </td>
      </tr>
      <tr>
        <td>log</td>
        <td>object</td>
        <td>console</td>
        <td>
          Log messages to a specific object (only if <code>debug</code> is true)
        </td>
      </tr>
    </tbody>
  </table>
);
