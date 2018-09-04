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
      <td>textcapitalcase</td>
      <td>Change text to init case</td>
      <td>init TEXT</td>
      <td>Init Text</td>
    </tr>
  </tbody>
</table>

<blockquote>Email Validation</blockquote>

`<input type="email" class="check">` or `<input type="text" name="your_email" class="check">` or `<input type="text" name="abc" data-type="email" class="check">`

Email validation has 3 ways to use it. First using a type `email`,the second way is using a name attribut which contains `email` and the last is using data atribut `data-type="email"`.

<table>
  <thead>
    <tr>
      <th>Allowed Charakter</th>
      <th>Allowed Email Format</th>
    </tr>
    <tr>
      <td>[alphabet], [numeric], [at], [dot], [underscore], [hyphen]</td>
      <td>Google & Yahoo Format</td>
    </tr>
    <tr>
      <th>Input</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controlchecker@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controlchecker@gm.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controlchecker@flt.co.jp</td>
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
      <td>true</td>
    </tr>
    <tr>
      <td>control.checker@flt.id</td>
      <td>true</td>
    </tr>
    <tr>
      <td>new.control-checker@flt.id</td>
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
<h3>Options</h3>
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
      <td><b>true</b></td>
      <td>Set plugin active even inside modal</td>
    </tr>
    <tr>
      <td>id</td>
      <td><b>String</b></td>
      <td><b>myModal</b></td>
      <td>Set id modal</td>
    </tr>
    <tr>
      <td>cssFramework</td>
      <td>No Rule</td>
      <td><b>Boostrap</b> or <b>SUI</b></td>
      <td><b>Boostrap</b></td>
      <td>Set supported smart grouping in css framework</td>
    </tr>
    <tr>
      <td>formId</td>
      <td></td>
      <td>String</td>
      <td><b>null</b></td>
      <td>Set supported smart grouping in form with specified id. By default will support with all form if not reset this option</td>
    </tr>
    <tr>
      <td rowspan="3">changes</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-changes</b></td>
      <td>Set class when value is change</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>false</b></td>
      <td>Set text condition will show or hide</td>
    </tr>
    <tr>
      <td>text</td>
      <td>String</td>
      <td><b>Berganti</b></td>
      <td>Text change value condition</td>
    </tr>
    <tr>
      <td rowspan="3">success</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-success</b></td>
      <td>Set class when return value is success after checking to server</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set text success will show or hide</td>
    </tr>
    <tr>
      <td>text</td>
      <td>String</td>
      <td><b>Tersedia</b></td>
      <td>Text success value condition</td>
    </tr>
    <tr>
      <td rowspan="3">warning</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-warning</b></td>
      <td>Set class when return value is not success after checking to server</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set text warning will show or hide</td>
    </tr>
    <tr>
      <td>text</td>
      <td>String</td>
      <td><b>Sudah Terpakai</b></td>
      <td>Text warning value condition</td>
    </tr>
    <tr>
      <td rowspan="3">empty</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-empty</b></td>
      <td>Set class when input field less then 1 charakter</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set text empty will show or hide</td>
    </tr>
    <tr>
      <td>text</td>
      <td>String</td>
      <td><b>Tidak Boleh Kosong</b></td>
      <td>Text empty value condition</td>
    </tr>
    <tr>
      <td rowspan="4">error</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-error</b></td>
      <td>Set class input length less then minlength attribut or more then maxlength attribut or ajax return error</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set text error will show or hide</td>
    </tr>
    <tr>
      <td>text</td>
      <td>String</td>
      <td><b>Masih Kurang</b></td>
      <td>Text success value condition</td>
    </tr>
    <tr>
      <td>secondText</td>
      <td>String</td>
      <td><b>Karakter</b></td>
      <td>Second text success value condition</td>
    </tr>
    <tr>
      <td rowspan="6">match</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-unmatch</b></td>
      <td>Set class when matching fields are not match</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set text unmatch will show or hide</td>
    </tr>
    <tr>
      <td>unmatchText</td>
      <td>String</td>
      <td><b>Belum Sama</b></td>
      <td>Text when unmatch return result</td>
    </tr>
    <tr>
      <td>matchText</td>
      <td>String</td>
      <td></td>
      <td>Text when matching return result</td>
    </tr>
    <tr>
      <td>matchThisId</td>
      <td>String</td>
      <td><b>null</b></td>
      <td>Set match input id</td>
    </tr>
    <tr>
      <td>matchToId</td>
      <td>String</td>
      <td><b>null</b></td>
      <td>Set matching to input id</td>
    </tr>
    <tr>
      <td rowspan="3">unsuit</td>
      <td>class</td>
      <td>String</td>
      <td><b>has-unsuit</b></td>
      <td>Set class when email input field format not allowed</td>
    </tr>
    <tr>
      <td>showText</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set text unsuit will show or hide</td>
    </tr>
    <tr>
      <td>text</td>
      <td>String</td>
      <td><b>Tidak Boleh Kosong</b></td>
      <td>Formatnya Belum Sesuai</td>
    </tr>
    <tr>
      <td>parentClass</td>
      <td></td>
      <td>String</td>
      <td><b>form-group</b></td>
      <td>Set class for smart grouping</td>
    </tr>
    <tr>
      <td rowspan="8">icon</td>
      <td>enabled</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>true</b></td>
      <td>Set icon class to show or hide</td>
    </tr>
    <tr>
      <td>position</td>
      <td><b>before</b> or <b>after</b></td>
      <td><b>before</b></td>
      <td>Set icon position before or after text</td>
    </tr>
    <tr>
      <td>success</td>
      <td>String</td>
      <td><b>fa fa-check</b></td>
      <td>Success icon</td>
    </tr>
    <tr>
      <td>warning</td>
      <td>String</td>
      <td><b>fa fa-bell-o</b></td>
      <td>Warning icon</td>
    </tr>
    <tr>
      <td>empty</td>
      <td>String</td>
      <td><b>fa fa-info</b></td>
      <td>Empty icon</td>
    </tr>
    <tr>
      <td>error</td>
      <td>String</td>
      <td><b>fa fa-info-circle</b></td>
      <td>Error icon</td>
    </tr>
    <tr>
      <td>unmatch</td>
      <td>String</td>
      <td><b>fa fa-exclamation-circle</b></td>
      <td>Unmatch icon</td>
    </tr>
    <tr>
      <td>unsuit</td>
      <td>String</td>
      <td><b>fa fa-exclamation</b></td>
      <td>Unsuit icon</td>
    </tr>
    <tr>
      <td rowspan="3">ajax</td>
      <td>url</td>
      <td>String</td>
      <td><b>null</b></td>
      <td>Set url for ajax (checking data to server)</td>
    </tr>
    <tr>
      <td>type</td>
      <td><b>get</b> or <b>post</b></td>
      <td><b>get</b></td>
      <td>Set method transfer data for ajax (checking data to server)</td>
    </tr>
    <tr>
      <td>errorText</td>
      <td>String</td>
      <td><b>Gagal Melakukan Ajax</b></td>
      <td>Set output text when ajax return error</td>
    </tr>
    <tr>
      <td rowspan="3">chained</td>
      <td>enabled</td>
      <td><b>true</b> or <b>false</b></td>
      <td><b>false</b></td>
      <td>Set enable ajax do checking with chained to other input field and send this (value and name) data to server for checking purpose with current input was invoked</td>
    </tr>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>null</td>
      <td>set a chained id input tag for checking data to server</td>
    </tr>
    <tr>
      <td>activeOnId</td>
      <td>String</td>
      <td>null</td>
      <td>Set tag input id who will trigger chained id for checking purpose</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Option Name</th>
      <th>Option Rule</th>
      <th>Option Value</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </tfoot>
</table>

<h3>Check Data To Server</h3>
<blockquote>HTML</blockquote>
In html area add data atribute withname data-table with value table name who will be using for checking

`<input type="email" class="check" name="email" minlength="6" maxlength="50 data-table="users">"`

<blockquote>JS</blockquote>

`$('.check').controlChecker({
  ajax: {
    url: 'example.com', // url for check the data
    type: 'post'
  }
 });`
 
 <blockquote>Server Side Checking</blockquote>
 In this example will use PHP and must return a json object with key name is "exists" and the return value is boolean (true or false).
 So if in the database have same value as user new input value, the return is true that mean the input value are not available (exists = true) else return (exists = false) that mean input are available. 
<b>NB: remember field are name in input atribute, and table are from data-table atribut who has give in html code.
return format allowed are json only with key name exists and boolean return value.</b>

 `<?php 
  if (isset($_POST['field']) && isset($_POST['table']) && isset($_POST['value'])) {
  
  // $field       = strtolower(trim($_POST['field']));
  // $value       = strtolower(trim($_POST['value']));
  // $table       = strtolower(trim($_POST['table']));
  // $output      = ['exists' => false]; // json format key exists and give false value before checking
	
  // your query like "SELECT COUNT(*) as c_data FROM " . {$table} . " WHERE " . {$field} . " = " . {$value}. ";
  
  // bla bla bla until result of your query lets store in variable called $rest
  
  // example $rest = DB::getInstance()->get('COUNT(*) c_data', $table, array($field, '=', $value))->result();

	$output['exists'] = $rest->c_data ? true : false;
    echo json_encode($output);
    return false;
}`

<h3>Chained Checking</h3>
What it is mean? Chained Checking is for check data but will be check to others field too.
For example we need some informations about users bank accound id. In normally case a user bank account have unique number but that only happen in the same bank, how about others bank? There a posibility a user have same account number but the bank is difference. So chakned checking will use for that purpose.
<blockquote>HTML</blockquote>
First input is bank id

`<input type="text" name="bank_code" class="check" data-table="banks" id="bank_code">`

Seccond input is bank account

`<input type="text" name="bank_account" class="check" data-table="users" id="bank_account">`

<blockquote>JS</blockquote>

`$('.check').controlChecker({
  ajax: {
    url: 'example.com', // url for check the data
    type: 'post'
  },
  chained: {
				enabled: true,
				id: 'bank_code', // input bank code id
				activeOnId: 'bank_account' // input bank account id
  }
 });`
 
 <blockquote>Server Side Checking</blockquote>
 
 `<?php 
  if (isset($_POST['field']) && isset($_POST['table']) && isset($_POST['value']) && isset($_POST['prevColumnName']) && isset($_POST['prevColumnValue'])) {
	$field        = strtolower(trim($_POST['field']));
	$value        = strtolower(trim($_POST['value']));
	$table        = strtolower(trim($_POST['table']));
  $chainedField  = strtolower(trim($_POST['prevColumnName'])); // chained field name
  $chainedValue = strtolower(trim($_POST['prevColumnValue'])); // chained field value
  $output       = ['exists' => false]; // json format key exists and give false value before checking
	
  // your query like "SELECT COUNT(*) as c_data FROM " . {$table} . " WHERE " . {$field} . " = " . {$value}. " AND " . {$chainedField} . " = " . {$chainedValue}";

	$output['exists'] = $rest->c_data ? true : false;
    echo json_encode($output);
    return false;
}`

<h1>Updated Doc 4/9/2018. Other Doc On Progress</h1>
