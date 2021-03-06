/*
When we attended middle school were asked to simplify mathematical expressions like "3x-yx+2xy-x" (or usually bigger), and that was easy-peasy ("2x+xy"). But tell that to your pc and we'll see! 

Write a function:

simplify(poly)
that takes a string in input, representing a multilinear non-constant polynomial in integers coefficients (like "3x-zx+2xy-x"), and returns another string as output where the same expression has been simplified in the following way ( -> means application of simplify):

All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:
"cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab" 

All monomials appears in order of increasing number of variables, e.g.:
"-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz" 

If two monomials have the same number of variables, they appears in lexicographic order, e.g.:
"a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz" 

There is no leading + sign if the first coefficient is positive, e.g.:
"-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y" 

N.B. to keep it simplest, the string in input is restricted to represent only multilinear non-constant polynomials, so you won't find something like `-3+yx^2'. Multilinear means in this context: of degree 1 on each variable.

Warning: the string in input can contain arbitrary variables represented by lowercase characters in the english alphabet.
*/

function simplify(poly){
	//sorting
	var final=[];
	poly= poly.match(/[-+]?\d*([a-z])+/gi).map(item=>{return  item.split('').sort().join('')}).join('');
	console.log(poly);
	poly.match(/[a-z]+/gi).sort().filter(function(item,index,arr){
		return item===arr[index+1]?false:true;
	}).forEach(function(item,index){
			let regexp=new RegExp("[-+]?\\d*[^a-z]"+item+"\\b","gi");
			let sum=0;
			poly.match(regexp).forEach(function(item1){
				item1=item1.replace(/[a-z]+/g,'');
				item1.length==1?item1=item1+'1':'';
				sum=sum+parseInt(item1);
			});
		index!=0?sum>0? sum='+'+sum:''   :''
		sum!=0?final.push(sum+item):'';
		});
	return final.sort(function(a,b){return a.length<b.length?false:true}).join('');
}

console.log(simplify('-a+5ba+3a-c-2a-4cba'))