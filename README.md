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
      <td>textuppercase</td>
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

<blockquote>Email Validation</blockquote>

`<input type="email" class="check">` or `<input type="text" name="your_email" class="check">`

Email validation has 2 ways to use it. First using a type `email`, and the second way is using a name attribut which contains `email`.

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controlchekcer@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controlchecker@gm.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controlchekcer@flt.co.jp</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controlchecker@flt.i</td>
      <td>false</td>
    </tr>
    <tr>
      <td>controlchecker@flt.i2</td>
      <td>false</td>
    </tr>
    <tr>
      <td>controlchecker@flt.co.jp.kr</td>
      <td>false</td>
    </tr>
    <tr>
      <td>controlchecker1@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>1controlchecker@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>-controlchecker1@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>_controlchecker1@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control_checker1@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>control-checker1@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>control-c@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control-ck@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>control_@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control_checker_validator@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control-checker-validator@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control_checker-@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control__checker@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>control--checker@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>controlchecker@@flt.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>controlchecker1@flt@co.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>controlchecker@f.id</td>
      <td>false</td>
    </tr>
    <tr>
      <td>c@flt.id</td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h3>Option</h3>
<table>
  <thead>
    <tr>
      <th>Option Name</th>
      <th>Option Rule</th>
      <th>Option Value</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">modal</td>
      <td>enabled</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b>
      <td>Set plugin active even inside modal</td>
    </tr>
    <tr>
      <td>id</td>
      <td><b>String</b></td>
      <td><b>myModal</b>
      <td>Set id modal</td>
    </tr>
  </tbody>
</table>

<h1>Updated Doc 3/23/2018. Other Doc On Progress</h1>
