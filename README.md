# controlChecker
Form Control, Checker &amp; Validation Input Plugins

<h3>Getting Started</h3>
<p><b>controlChecker</b> is plugins that you can use for <b>checking data</b> to server, 
controling input form with <b>Smart Grouping</b> and prevent clicking submit when a form did'nt all clear from error/warning/danger state, and it has
awsome <b>validation input</b> types, specially for email.</p>
<h3>How To Use</h3>
<ul>
  <li>Load css & js file</li>
  <li>Init plugins</li>
</ul>
<h3>Example</h3>
<blockquote>HTML</blockquote>

`<input type="text" class="check">`

<blockquote>JS</blockquote>

`$('.check').controlChecker();`

<p>By default it will check if input value and lenght of value. If input value is empty then it will invok empty state and if lenght value is < 1 or less then minlength attribut then invok the error state.</p>

<blockquote>Minlength and Maxlength atribut</blockquote>

`<input type="text" class="check" minlength="6" maxlength="6">`

By default it will read minleght and maxlength for example you need input for pin number but number only will allowed. So <b>add</b> a class `digit` 

`<input type="text" class="check digit" minlength="6" maxlength="6">`

<blockquote>Another class</blockquote>

<table>
  <thead>
    <tr>
      <th>Class Name</th>
      <th>Description</th>
      <th>Input State</th>
      <th>Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>textlowercase</td>
      <td>Change text to lower case</td>
      <td>LOWER TEXT</td>
      <td>lower text</td>
    </tr>
    <tr>
      <td>textlowercase</td>
      <td>Change text to upper case</td>
      <td>upper teXt</td>
      <td>UPPER TEXT</td>
    </tr>
    <tr>
      <td>textinitcase</td>
      <td>Change text to init case</td>
      <td>init TEXT</td>
      <td>Init Text</td>
    </tr>
  </tbody>
</table>
