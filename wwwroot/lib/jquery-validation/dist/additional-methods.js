/*!
*jQueryValidationPluginv1.17.0
*
*https://jqueryvalidation.org/
*
*Copyright(c)2017JörnZaefferer
*ReleasedundertheMITlicense
*/
(function(factory){
	if(typeofdefine==="function"&&define.amd){
		define(["jquery","./jquery.validate"],factory);
	}elseif(typeofmodule==="object"&&module.exports){
		module.exports=factory(require("jquery"));
	}else{
		factory(jQuery);
	}
}(function($){

(function(){

	functionstripHtml(value){

		//Removehtmltagsandspacechars
		returnvalue.replace(/<.[^<>]*?>/g,"").replace(/&nbsp;|&#160;/gi,"")

		//Removepunctuation
		.replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g,"");
	}

	$.validator.addMethod("maxWords",function(value,element,params){
		returnthis.optional(element)||stripHtml(value).match(/\b\w+\b/g).length<=params;
	},$.validator.format("Pleaseenter{0}wordsorless."));

	$.validator.addMethod("minWords",function(value,element,params){
		returnthis.optional(element)||stripHtml(value).match(/\b\w+\b/g).length>=params;
	},$.validator.format("Pleaseenteratleast{0}words."));

	$.validator.addMethod("rangeWords",function(value,element,params){
		varvalueStripped=stripHtml(value),
			regex=/\b\w+\b/g;
		returnthis.optional(element)||valueStripped.match(regex).length>=params[0]&&valueStripped.match(regex).length<=params[1];
	},$.validator.format("Pleaseenterbetween{0}and{1}words."));

}());

//Acceptavaluefromafileinputbasedonarequiredmimetype
$.validator.addMethod("accept",function(value,element,param){

	//Splitmimeoncommasincasewehavemultipletypeswecanaccept
	vartypeParam=typeofparam==="string"?param.replace(/\s/g,""):"image/*",
		optionalValue=this.optional(element),
		i,file,regex;

	//Elementisoptional
	if(optionalValue){
		returnoptionalValue;
	}

	if($(element).attr("type")==="file"){

		//Escapestringtobeusedintheregex
		//see:https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
		//Escapealso"/*"as"/.*"asawildcard
		typeParam=typeParam
				.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g,"\\$&")
				.replace(/,/g,"|")
				.replace(/\/\*/g,"/.*");

		//CheckiftheelementhasaFileListbeforecheckingeachfile
		if(element.files&&element.files.length){
			regex=newRegExp(".?("+typeParam+")$","i");
			for(i=0;i<element.files.length;i++){
				file=element.files[i];

				//Grabthemimetypefromtheloadedfile,verifyitmatches
				if(!file.type.match(regex)){
					returnfalse;
				}
			}
		}
	}

	//Eitherreturntruebecausewe'vevalidatedeachfile,orbecausethe
	//browserdoesnotsupportelement.filesandtheFileListfeature
	returntrue;
},$.validator.format("Pleaseenteravaluewithavalidmimetype."));

$.validator.addMethod("alphanumeric",function(value,element){
	returnthis.optional(element)||/^\w+$/i.test(value);
},"Letters,numbers,andunderscoresonlyplease");

/*
*Dutchbankaccountnumbers(not'giro'numbers)have9digits
*andpassthe'11check'.
*Weacceptthenotationwithspaces,asthatiscommon.
*acceptable:123456789or123456789
*/
$.validator.addMethod("bankaccountNL",function(value,element){
	if(this.optional(element)){
		returntrue;
	}
	if(!(/^[0-9]{9}|([0-9]{2}){3}[0-9]{3}$/.test(value))){
		returnfalse;
	}

	//Now'11check'
	varaccount=value.replace(//g,""),//Removespaces
		sum=0,
		len=account.length,
		pos,factor,digit;
	for(pos=0;pos<len;pos++){
		factor=len-pos;
		digit=account.substring(pos,pos+1);
		sum=sum+factor*digit;
	}
	returnsum%11===0;
},"Pleasespecifyavalidbankaccountnumber");

$.validator.addMethod("bankorgiroaccountNL",function(value,element){
	returnthis.optional(element)||
			($.validator.methods.bankaccountNL.call(this,value,element))||
			($.validator.methods.giroaccountNL.call(this,value,element));
},"Pleasespecifyavalidbankorgiroaccountnumber");

/**
*BICisthebusinessidentifiercode(ISO9362).ThisBICcheckisnotaguaranteeforauthenticity.
*
*BICpattern:BBBBCCLLbbb(8or11characterslong;bbbisoptional)
*
*Validationiscase-insensitive.Pleasemakesuretonormalizeinputyourself.
*
*BICdefinitionindetail:
*-First4characters-bankcode(onlyletters)
*-Next2characters-ISO3166-1alpha-2countrycode(onlyletters)
*-Next2characters-locationcode(lettersanddigits)
*a.shallnotstartwith'0'or'1'
*b.secondcharactermustbealetter('O'isnotallowed)ordigit('0'fortest(thereforenotallowed),'1'denotingpassiveparticipant,'2'typicallyreverse-billing)
*-Last3characters-branchcode,optional(shallnotstartwith'X'exceptincaseof'XXX'forprimaryoffice)(lettersanddigits)
*/
$.validator.addMethod("bic",function(value,element){
returnthis.optional(element)||/^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(value.toUpperCase());
},"PleasespecifyavalidBICcode");

/*
*Códigodeidentificaciónfiscal(CIF)isthetaxidentificationcodeforSpanishlegalentities
*FurtherrulescanbefoundinSpanishonhttp://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
*
*SpanishCIFstructure:
*
*[T][P][P][N][N][N][N][N][C]
*
*Where:
*
*T:1character.KindofOrganizationLetter:[ABCDEFGHJKLMNPQRSUVW]
*P:2characters.Province.
*N:5characters.SecuencialNumberwithintheprovince.
*C:1character.ControlDigit:[0-9A-J].
*
*[T]:KindofOrganizations.Possiblevalues:
*
*A.Corporations
*B.LLCs
*C.Generalpartnerships
*D.Companieslimitedpartnerships
*E.Communitiesofgoods
*F.CooperativeSocieties
*G.Associations
*H.Communitiesofhomeownersinhorizontalpropertyregime
*J.CivilSocieties
*K.Oldformat
*L.Oldformat
*M.Oldformat
*N.Nonresidententities
*P.Localauthorities
*Q.Autonomousbodies,stateornot,andthelike,andcongregationsandreligiousinstitutions
*R.Congregationsandreligiousinstitutions(since2008ORDEREHA/451/2008)
*S.OrgansofStateAdministrationandregions
*V.AgrarianTransformation
*W.Permanentestablishmentsofnon-residentinSpain
*
*[C]:ControlDigit.ItcanbeanumberoraletterdependingonTvalue:
*[T]-->[C]
*----------------
*ANumber
*BNumber
*ENumber
*HNumber
*KLetter
*PLetter
*QLetter
*SLetter
*
*/
$.validator.addMethod("cifES",function(value,element){
	"usestrict";

	if(this.optional(element)){
		returntrue;
	}

	varcifRegEx=newRegExp(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/gi);
	varletter=value.substring(0,1),//[T]
		number=value.substring(1,8),//[P][P][N][N][N][N][N]
		control=value.substring(8,9),//[C]
		all_sum=0,
		even_sum=0,
		odd_sum=0,
		i,n,
		control_digit,
		control_letter;

	functionisOdd(n){
		returnn%2===0;
	}

	//Quickformattest
	if(value.length!==9||!cifRegEx.test(value)){
		returnfalse;
	}

	for(i=0;i<number.length;i++){
		n=parseInt(number[i],10);

		//Oddpositions
		if(isOdd(i)){

			//Oddpositionsaremultipliedfirst.
			n*=2;

			//Ifthemultiplicationisbiggerthan10weneedtoadjust
			odd_sum+=n<10?n:n-9;

		//Evenpositions
		//Justsumthem
		}else{
			even_sum+=n;
		}
	}

	all_sum=even_sum+odd_sum;
	control_digit=(10-(all_sum).toString().substr(-1)).toString();
	control_digit=parseInt(control_digit,10)>9?"0":control_digit;
	control_letter="JABCDEFGHI".substr(control_digit,1).toString();

	//Controlmustbeadigit
	if(letter.match(/[ABEH]/)){
		returncontrol===control_digit;

	//Controlmustbealetter
	}elseif(letter.match(/[KPQS]/)){
		returncontrol===control_letter;
	}

	//Canbeeither
	returncontrol===control_digit||control===control_letter;

},"PleasespecifyavalidCIFnumber.");

/*
*BrazillianCPFnumber(CadastradodePessoasFísicas)istheequivalentofaBraziliantaxregistrationnumber.
*CPFnumbershave11digitsintotal:9numbersfollowedby2checknumbersthatarebeingusedforvalidation.
*/
$.validator.addMethod("cpfBR",function(value){

	//Removingspecialcharactersfromvalue
	value=value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/?])+/g,"");

	//Checkingvaluetohave11digitsonly
	if(value.length!==11){
		returnfalse;
	}

	varsum=0,
		firstCN,secondCN,checkResult,i;

	firstCN=parseInt(value.substring(9,10),10);
	secondCN=parseInt(value.substring(10,11),10);

	checkResult=function(sum,cn){
		varresult=(sum*10)%11;
		if((result===10)||(result===11)){
			result=0;
		}
		return(result===cn);
	};

	//Checkingfordumpdata
	if(value===""||
		value==="00000000000"||
		value==="11111111111"||
		value==="22222222222"||
		value==="33333333333"||
		value==="44444444444"||
		value==="55555555555"||
		value==="66666666666"||
		value==="77777777777"||
		value==="88888888888"||
		value==="99999999999"
	){
		returnfalse;
	}

	//Step1-usingfirstCheckNumber:
	for(i=1;i<=9;i++){
		sum=sum+parseInt(value.substring(i-1,i),10)*(11-i);
	}

	//IffirstCheckNumber(CN)isvalid,movetoStep2-usingsecondCheckNumber:
	if(checkResult(sum,firstCN)){
		sum=0;
		for(i=1;i<=10;i++){
			sum=sum+parseInt(value.substring(i-1,i),10)*(12-i);
		}
		returncheckResult(sum,secondCN);
	}
	returnfalse;

},"PleasespecifyavalidCPFnumber");

//https://jqueryvalidation.org/creditcard-method/
//basedonhttps://en.wikipedia.org/wiki/Luhn_algorithm
$.validator.addMethod("creditcard",function(value,element){
	if(this.optional(element)){
		return"dependency-mismatch";
	}

	//Acceptonlyspaces,digitsanddashes
	if(/[^0-9\-]+/.test(value)){
		returnfalse;
	}

	varnCheck=0,
		nDigit=0,
		bEven=false,
		n,cDigit;

	value=value.replace(/\D/g,"");

	//Basingminandmaxlengthon
	//https://developer.ean.com/general_info/Valid_Credit_Card_Types
	if(value.length<13||value.length>19){
		returnfalse;
	}

	for(n=value.length-1;n>=0;n--){
		cDigit=value.charAt(n);
		nDigit=parseInt(cDigit,10);
		if(bEven){
			if((nDigit*=2)>9){
				nDigit-=9;
			}
		}

		nCheck+=nDigit;
		bEven=!bEven;
	}

	return(nCheck%10)===0;
},"Pleaseenteravalidcreditcardnumber.");

/*NOTICE:ModifiedversionofCastle.Components.Validator.CreditCardValidator
*RedistributedunderthetheApacheLicense2.0athttp://www.apache.org/licenses/LICENSE-2.0
*ValidTypes:mastercard,visa,amex,dinersclub,enroute,discover,jcb,unknown,all(overridesallothersettings)
*/
$.validator.addMethod("creditcardtypes",function(value,element,param){
	if(/[^0-9\-]+/.test(value)){
		returnfalse;
	}

	value=value.replace(/\D/g,"");

	varvalidTypes=0x0000;

	if(param.mastercard){
		validTypes|=0x0001;
	}
	if(param.visa){
		validTypes|=0x0002;
	}
	if(param.amex){
		validTypes|=0x0004;
	}
	if(param.dinersclub){
		validTypes|=0x0008;
	}
	if(param.enroute){
		validTypes|=0x0010;
	}
	if(param.discover){
		validTypes|=0x0020;
	}
	if(param.jcb){
		validTypes|=0x0040;
	}
	if(param.unknown){
		validTypes|=0x0080;
	}
	if(param.all){
		validTypes=0x0001|0x0002|0x0004|0x0008|0x0010|0x0020|0x0040|0x0080;
	}
	if(validTypes&0x0001&&/^(5[12345])/.test(value)){//Mastercard
		returnvalue.length===16;
	}
	if(validTypes&0x0002&&/^(4)/.test(value)){//Visa
		returnvalue.length===16;
	}
	if(validTypes&0x0004&&/^(3[47])/.test(value)){//Amex
		returnvalue.length===15;
	}
	if(validTypes&0x0008&&/^(3(0[012345]|[68]))/.test(value)){//Dinersclub
		returnvalue.length===14;
	}
	if(validTypes&0x0010&&/^(2(014|149))/.test(value)){//Enroute
		returnvalue.length===15;
	}
	if(validTypes&0x0020&&/^(6011)/.test(value)){//Discover
		returnvalue.length===16;
	}
	if(validTypes&0x0040&&/^(3)/.test(value)){//Jcb
		returnvalue.length===16;
	}
	if(validTypes&0x0040&&/^(2131|1800)/.test(value)){//Jcb
		returnvalue.length===15;
	}
	if(validTypes&0x0080){//Unknown
		returntrue;
	}
	returnfalse;
},"Pleaseenteravalidcreditcardnumber.");

/**
*Validatescurrencieswithanygivensymbolsby@jameslouiz
*Symbolscanbeoptionalorrequired.Symbolsrequiredbydefault
*
*Usageexamples:
*currency:["£",false]-Usefalseforsoftcurrencyvalidation
*currency:["$",false]
*currency:["RM",false]-alsoworkswithtextbasedsymbolssuchas"RM"-MalaysiaRinggitetc
*
*<inputclass="currencyInput"name="currencyInput">
*
*Softsymbolchecking
*currencyInput:{
*currency:["$",false]
*}
*
*Strictsymbolchecking(default)
*currencyInput:{
*currency:"$"
*//OR
*currency:["$",true]
*}
*
*MultipleSymbols
*currencyInput:{
*currency:"$,£,¢"
*}
*/
$.validator.addMethod("currency",function(value,element,param){
varisParamString=typeofparam==="string",
symbol=isParamString?param:param[0],
soft=isParamString?true:param[1],
regex;

symbol=symbol.replace(/,/g,"");
symbol=soft?symbol+"]":symbol+"]?";
regex="^["+symbol+"([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$";
regex=newRegExp(regex);
returnthis.optional(element)||regex.test(value);

},"Pleasespecifyavalidcurrency");

$.validator.addMethod("dateFA",function(value,element){
	returnthis.optional(element)||/^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(value);
},$.validator.messages.date);

/**
*Returntrue,ifthevalueisavaliddate,alsomakingthisformalcheckdd/mm/yyyy.
*
*@example$.validator.methods.date("01/01/1900")
*@resulttrue
*
*@example$.validator.methods.date("01/13/1990")
*@resultfalse
*
*@example$.validator.methods.date("01.01.1900")
*@resultfalse
*
*@example<inputname="pippo"class="{dateITA:true}"/>
*@descDeclaresanoptionalinputelementwhosevaluemustbeavaliddate.
*
*@name$.validator.methods.dateITA
*@typeBoolean
*@catPlugins/Validate/Methods
*/
$.validator.addMethod("dateITA",function(value,element){
	varcheck=false,
		re=/^\d{1,2}\/\d{1,2}\/\d{4}$/,
		adata,gg,mm,aaaa,xdata;
	if(re.test(value)){
		adata=value.split("/");
		gg=parseInt(adata[0],10);
		mm=parseInt(adata[1],10);
		aaaa=parseInt(adata[2],10);
		xdata=newDate(Date.UTC(aaaa,mm-1,gg,12,0,0,0));
		if((xdata.getUTCFullYear()===aaaa)&&(xdata.getUTCMonth()===mm-1)&&(xdata.getUTCDate()===gg)){
			check=true;
		}else{
			check=false;
		}
	}else{
		check=false;
	}
	returnthis.optional(element)||check;
},$.validator.messages.date);

$.validator.addMethod("dateNL",function(value,element){
	returnthis.optional(element)||/^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(value);
},$.validator.messages.date);

//Older"accept"fileextensionmethod.Olddocs:http://docs.jquery.com/Plugins/Validation/Methods/accept
$.validator.addMethod("extension",function(value,element,param){
	param=typeofparam==="string"?param.replace(/,/g,"|"):"png|jpe?g|gif";
	returnthis.optional(element)||value.match(newRegExp("\\.("+param+")$","i"));
},$.validator.format("Pleaseenteravaluewithavalidextension."));

/**
*Dutchgiroaccountnumbers(notbanknumbers)havemax7digits
*/
$.validator.addMethod("giroaccountNL",function(value,element){
	returnthis.optional(element)||/^[0-9]{1,7}$/.test(value);
},"Pleasespecifyavalidgiroaccountnumber");

/**
*IBANistheinternationalbankaccountnumber.
*Ithasacountry-specificformat,thatischeckedheretoo
*
*Validationiscase-insensitive.Pleasemakesuretonormalizeinputyourself.
*/
$.validator.addMethod("iban",function(value,element){

	//Somequicksimpleteststopreventneedlesswork
	if(this.optional(element)){
		returntrue;
	}

	//Removespacesandtouppercase
	variban=value.replace(//g,"").toUpperCase(),
		ibancheckdigits="",
		leadingZeroes=true,
		cRest="",
		cOperator="",
		countrycode,ibancheck,charAt,cChar,bbanpattern,bbancountrypatterns,ibanregexp,i,p;

	//CheckforIBANcodelength.
	//Itcontains:
	//countrycodeISO3166-1-twoletters,
	//twocheckdigits,
	//BasicBankAccountNumber(BBAN)-upto30chars
	varminimalIBANlength=5;
	if(iban.length<minimalIBANlength){
		returnfalse;
	}

	//Checkthecountrycodeandfindthecountryspecificformat
	countrycode=iban.substring(0,2);
	bbancountrypatterns={
		"AL":"\\d{8}[\\dA-Z]{16}",
		"AD":"\\d{8}[\\dA-Z]{12}",
		"AT":"\\d{16}",
		"AZ":"[\\dA-Z]{4}\\d{20}",
		"BE":"\\d{12}",
		"BH":"[A-Z]{4}[\\dA-Z]{14}",
		"BA":"\\d{16}",
		"BR":"\\d{23}[A-Z][\\dA-Z]",
		"BG":"[A-Z]{4}\\d{6}[\\dA-Z]{8}",
		"CR":"\\d{17}",
		"HR":"\\d{17}",
		"CY":"\\d{8}[\\dA-Z]{16}",
		"CZ":"\\d{20}",
		"DK":"\\d{14}",
		"DO":"[A-Z]{4}\\d{20}",
		"EE":"\\d{16}",
		"FO":"\\d{14}",
		"FI":"\\d{14}",
		"FR":"\\d{10}[\\dA-Z]{11}\\d{2}",
		"GE":"[\\dA-Z]{2}\\d{16}",
		"DE":"\\d{18}",
		"GI":"[A-Z]{4}[\\dA-Z]{15}",
		"GR":"\\d{7}[\\dA-Z]{16}",
		"GL":"\\d{14}",
		"GT":"[\\dA-Z]{4}[\\dA-Z]{20}",
		"HU":"\\d{24}",
		"IS":"\\d{22}",
		"IE":"[\\dA-Z]{4}\\d{14}",
		"IL":"\\d{19}",
		"IT":"[A-Z]\\d{10}[\\dA-Z]{12}",
		"KZ":"\\d{3}[\\dA-Z]{13}",
		"KW":"[A-Z]{4}[\\dA-Z]{22}",
		"LV":"[A-Z]{4}[\\dA-Z]{13}",
		"LB":"\\d{4}[\\dA-Z]{20}",
		"LI":"\\d{5}[\\dA-Z]{12}",
		"LT":"\\d{16}",
		"LU":"\\d{3}[\\dA-Z]{13}",
		"MK":"\\d{3}[\\dA-Z]{10}\\d{2}",
		"MT":"[A-Z]{4}\\d{5}[\\dA-Z]{18}",
		"MR":"\\d{23}",
		"MU":"[A-Z]{4}\\d{19}[A-Z]{3}",
		"MC":"\\d{10}[\\dA-Z]{11}\\d{2}",
		"MD":"[\\dA-Z]{2}\\d{18}",
		"ME":"\\d{18}",
		"NL":"[A-Z]{4}\\d{10}",
		"NO":"\\d{11}",
		"PK":"[\\dA-Z]{4}\\d{16}",
		"PS":"[\\dA-Z]{4}\\d{21}",
		"PL":"\\d{24}",
		"PT":"\\d{21}",
		"RO":"[A-Z]{4}[\\dA-Z]{16}",
		"SM":"[A-Z]\\d{10}[\\dA-Z]{12}",
		"SA":"\\d{2}[\\dA-Z]{18}",
		"RS":"\\d{18}",
		"SK":"\\d{20}",
		"SI":"\\d{15}",
		"ES":"\\d{20}",
		"SE":"\\d{20}",
		"CH":"\\d{5}[\\dA-Z]{12}",
		"TN":"\\d{20}",
		"TR":"\\d{5}[\\dA-Z]{17}",
		"AE":"\\d{3}\\d{16}",
		"GB":"[A-Z]{4}\\d{14}",
		"VG":"[\\dA-Z]{4}\\d{16}"
	};

	bbanpattern=bbancountrypatterns[countrycode];

	//AsnewcountrieswillstartusingIBANinthe
	//future,weonlycheckifthecountrycodeisknown.
	//Thispreventsfalsenegatives,whilealmostall
	//falsepositivesintroducedbythis,willbecaught
	//bythechecksumvalidationbelowanyway.
	//StrictcheckingshouldreturnFALSEforunknown
	//countries.
	if(typeofbbanpattern!=="undefined"){
		ibanregexp=newRegExp("^[A-Z]{2}\\d{2}"+bbanpattern+"$","");
		if(!(ibanregexp.test(iban))){
			returnfalse;//Invalidcountryspecificformat
		}
	}

	//Nowcheckthechecksum,firstconverttodigits
	ibancheck=iban.substring(4,iban.length)+iban.substring(0,4);
	for(i=0;i<ibancheck.length;i++){
		charAt=ibancheck.charAt(i);
		if(charAt!=="0"){
			leadingZeroes=false;
		}
		if(!leadingZeroes){
			ibancheckdigits+="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
		}
	}

	//Calculatetheresultof:ibancheckdigits%97
	for(p=0;p<ibancheckdigits.length;p++){
		cChar=ibancheckdigits.charAt(p);
		cOperator=""+cRest+""+cChar;
		cRest=cOperator%97;
	}
	returncRest===1;
},"PleasespecifyavalidIBAN");

$.validator.addMethod("integer",function(value,element){
	returnthis.optional(element)||/^-?\d+$/.test(value);
},"Apositiveornegativenon-decimalnumberplease");

$.validator.addMethod("ipv4",function(value,element){
	returnthis.optional(element)||/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
},"PleaseenteravalidIPv4address.");

$.validator.addMethod("ipv6",function(value,element){
	returnthis.optional(element)||/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
},"PleaseenteravalidIPv6address.");

$.validator.addMethod("lettersonly",function(value,element){
	returnthis.optional(element)||/^[a-z]+$/i.test(value);
},"Lettersonlyplease");

$.validator.addMethod("letterswithbasicpunc",function(value,element){
	returnthis.optional(element)||/^[a-z\-.,()'"\s]+$/i.test(value);
},"Lettersorpunctuationonlyplease");

$.validator.addMethod("mobileNL",function(value,element){
	returnthis.optional(element)||/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
},"Pleasespecifyavalidmobilenumber");

/*ForUKphonefunctions,dothefollowingserversideprocessing:
*CompareoriginalinputwiththisRegExpattern:
*^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
*Extract$1andset$prefixto'+44<space>'if$1is'44',otherwiseset$prefixto'0'
*Extract$2andremovehyphens,spacesandparentheses.Phonenumberiscombined$prefixand$2.
*AnumberofverydetailedGBtelephonenumberRegExpatternscanalsobefoundat:
*http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
*/
$.validator.addMethod("mobileUK",function(phone_number,element){
	phone_number=phone_number.replace(/\(|\)|\s+|-/g,"");
	returnthis.optional(element)||phone_number.length>9&&
		phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/);
},"Pleasespecifyavalidmobilenumber");

$.validator.addMethod("netmask",function(value,element){
returnthis.optional(element)||/^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)/i.test(value);
},"Pleaseenteravalidnetmask.");

/*
*TheNIE(NúmerodeIdentificacióndeExtranjero)isaSpanishtaxidentificationnumberassignedbytheSpanish
*authoritiestoanyforeigner.
*
*TheNIEistheequivalentofaSpaniardsNúmerodeIdentificaciónFiscal(NIF)whichservesasafiscal
*identificationnumber.TheCIFnumber(CertificadodeIdentificaciónFiscal)isequivalenttotheNIF,butappliesto
*companiesratherthanindividuals.TheNIEconsistsofan'X'or'Y'followedby7or8digitsthenanotherletter.
*/
$.validator.addMethod("nieES",function(value,element){
	"usestrict";

	if(this.optional(element)){
		returntrue;
	}

	varnieRegEx=newRegExp(/^[MXYZ]{1}[0-9]{7,8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/gi);
	varvalidChars="TRWAGMYFPDXBNJZSQVHLCKET",
		letter=value.substr(value.length-1).toUpperCase(),
		number;

	value=value.toString().toUpperCase();

	//Quickformattest
	if(value.length>10||value.length<9||!nieRegEx.test(value)){
		returnfalse;
	}

	//Xmeanssamenumber
	//Ymeansnumber+10000000
	//Zmeansnumber+20000000
	value=value.replace(/^[X]/,"0")
		.replace(/^[Y]/,"1")
		.replace(/^[Z]/,"2");

	number=value.length===9?value.substr(0,8):value.substr(0,9);

	returnvalidChars.charAt(parseInt(number,10)%23)===letter;

},"PleasespecifyavalidNIEnumber.");

/*
*TheNúmerodeIdentificaciónFiscal(NIF)isthewaytaxidentificationusedinSpainforindividuals
*/
$.validator.addMethod("nifES",function(value,element){
	"usestrict";

	if(this.optional(element)){
		returntrue;
	}

	value=value.toUpperCase();

	//Basicformattest
	if(!value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")){
		returnfalse;
	}

	//TestNIF
	if(/^[0-9]{8}[A-Z]{1}$/.test(value)){
		return("TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8,0)%23)===value.charAt(8));
	}

	//TestspecialsNIF(startswithK,LorM)
	if(/^[KLM]{1}/.test(value)){
		return(value[8]==="TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8,1)%23));
	}

	returnfalse;

},"PleasespecifyavalidNIFnumber.");

/*
*Numeridentyfikacjipodatkowej(NIP)isthewaytaxidentificationusedinPolandforcompanies
*/
$.validator.addMethod("nipPL",function(value){
	"usestrict";

	value=value.replace(/[^0-9]/g,"");

	if(value.length!==10){
		returnfalse;
	}

	vararrSteps=[6,5,7,2,3,4,5,6,7];
	varintSum=0;
	for(vari=0;i<9;i++){
		intSum+=arrSteps[i]*value[i];
	}
	varint2=intSum%11;
	varintControlNr=(int2===10)?0:int2;

	return(intControlNr===parseInt(value[9],10));
},"PleasespecifyavalidNIPnumber.");

$.validator.addMethod("notEqualTo",function(value,element,param){
	returnthis.optional(element)||!$.validator.methods.equalTo.call(this,value,element,param);
},"Pleaseenteradifferentvalue,valuesmustnotbethesame.");

$.validator.addMethod("nowhitespace",function(value,element){
	returnthis.optional(element)||/^\S+$/i.test(value);
},"Nowhitespaceplease");

/**
*ReturntrueifthefieldvaluematchesthegivenformatRegExp
*
*@example$.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
*@resulttrue
*
*@example$.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
*@resultfalse
*
*@name$.validator.methods.pattern
*@typeBoolean
*@catPlugins/Validate/Methods
*/
$.validator.addMethod("pattern",function(value,element,param){
	if(this.optional(element)){
		returntrue;
	}
	if(typeofparam==="string"){
		param=newRegExp("^(?:"+param+")$");
	}
	returnparam.test(value);
},"Invalidformat.");

/**
*Dutchphonenumbershave10digits(or11andstartwith+31).
*/
$.validator.addMethod("phoneNL",function(value,element){
	returnthis.optional(element)||/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
},"Pleasespecifyavalidphonenumber.");

/*ForUKphonefunctions,dothefollowingserversideprocessing:
*CompareoriginalinputwiththisRegExpattern:
*^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
*Extract$1andset$prefixto'+44<space>'if$1is'44',otherwiseset$prefixto'0'
*Extract$2andremovehyphens,spacesandparentheses.Phonenumberiscombined$prefixand$2.
*AnumberofverydetailedGBtelephonenumberRegExpatternscanalsobefoundat:
*http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
*/

//MatchesUKlandline+mobile,acceptingonly01-3forlandlineor07formobiletoexcludemanypremiumnumbers
$.validator.addMethod("phonesUK",function(phone_number,element){
	phone_number=phone_number.replace(/\(|\)|\s+|-/g,"");
	returnthis.optional(element)||phone_number.length>9&&
		phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/);
},"Pleasespecifyavalidukphonenumber");

/*ForUKphonefunctions,dothefollowingserversideprocessing:
*CompareoriginalinputwiththisRegExpattern:
*^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
*Extract$1andset$prefixto'+44<space>'if$1is'44',otherwiseset$prefixto'0'
*Extract$2andremovehyphens,spacesandparentheses.Phonenumberiscombined$prefixand$2.
*AnumberofverydetailedGBtelephonenumberRegExpatternscanalsobefoundat:
*http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
*/
$.validator.addMethod("phoneUK",function(phone_number,element){
	phone_number=phone_number.replace(/\(|\)|\s+|-/g,"");
	returnthis.optional(element)||phone_number.length>9&&
		phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/);
},"Pleasespecifyavalidphonenumber");

/**
*MatchesUSphonenumberformat
*
*wheretheareacodemaynotstartwith1andtheprefixmaynotstartwith1
*allows'-'or''asaseparatorandallowsparensaroundareacode
*somepeoplemaywanttoputa'1'infrontoftheirnumber
*
*1(212)-999-2345or
*2129992344or
*212-999-0983
*
*butnot
*111-123-5434
*andnot
*2121234567
*/
$.validator.addMethod("phoneUS",function(phone_number,element){
	phone_number=phone_number.replace(/\s+/g,"");
	returnthis.optional(element)||phone_number.length>9&&
		phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
},"Pleasespecifyavalidphonenumber");

/*
*ValidaCEPsdobrasileiros:
*
*Formatosaceitos:
*99999-999
*99.999-999
*99999999
*/
$.validator.addMethod("postalcodeBR",function(cep_value,element){
	returnthis.optional(element)||/^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(cep_value);
},"InformeumCEPválido.");

/**
*MatchesavalidCanadianPostalCode
*
*@examplejQuery.validator.methods.postalCodeCA("H0H0H0",element)
*@resulttrue
*
*@examplejQuery.validator.methods.postalCodeCA("H0H0H0",element)
*@resultfalse
*
*@namejQuery.validator.methods.postalCodeCA
*@typeBoolean
*@catPlugins/Validate/Methods
*/
$.validator.addMethod("postalCodeCA",function(value,element){
	returnthis.optional(element)||/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]*\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(value);
},"Pleasespecifyavalidpostalcode");

/*MatchesItalianpostcode(CAP)*/
$.validator.addMethod("postalcodeIT",function(value,element){
	returnthis.optional(element)||/^\d{5}$/.test(value);
},"Pleasespecifyavalidpostalcode");

$.validator.addMethod("postalcodeNL",function(value,element){
	returnthis.optional(element)||/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(value);
},"Pleasespecifyavalidpostalcode");

//MatchesUKpostcode.DoesnotmatchtoUKChannelIslandsthathavetheirownpostcodes(nonstandardUK)
$.validator.addMethod("postcodeUK",function(value,element){
	returnthis.optional(element)||/^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(value);
},"PleasespecifyavalidUKpostcode");

/*
*Letsyousay"atleastXinputsthatmatchselectorYmustbefilled."
*
*Theendresultisthatneitheroftheseinputs:
*
*	<inputclass="productinfo"name="partnumber">
*	<inputclass="productinfo"name="description">
*
*	...willvalidateunlessatleastoneofthemisfilled.
*
*partnumber:	{require_from_group:[1,".productinfo"]},
*description:{require_from_group:[1,".productinfo"]}
*
*options[0]:numberoffieldsthatmustbefilledinthegroup
*options[1]:CSSselectorthatdefinesthegroupofconditionallyrequiredfields
*/
$.validator.addMethod("require_from_group",function(value,element,options){
	var$fields=$(options[1],element.form),
		$fieldsFirst=$fields.eq(0),
		validator=$fieldsFirst.data("valid_req_grp")?$fieldsFirst.data("valid_req_grp"):$.extend({},this),
		isValid=$fields.filter(function(){
			returnvalidator.elementValue(this);
		}).length>=options[0];

	//Storetheclonedvalidatorforfuturevalidation
	$fieldsFirst.data("valid_req_grp",validator);

	//Ifelementisn'tbeingvalidated,runeachrequire_from_groupfield'svalidationrules
	if(!$(element).data("being_validated")){
		$fields.data("being_validated",true);
		$fields.each(function(){
			validator.element(this);
		});
		$fields.data("being_validated",false);
	}
	returnisValid;
},$.validator.format("Pleasefillatleast{0}ofthesefields."));

/*
*Letsyousay"eitheratleastXinputsthatmatchselectorYmustbefilled,
*ORtheymustallbeskipped(leftblank)."
*
*Theendresult,isthatnoneoftheseinputs:
*
*	<inputclass="productinfo"name="partnumber">
*	<inputclass="productinfo"name="description">
*	<inputclass="productinfo"name="color">
*
*	...willvalidateunlesseitheratleasttwoofthemarefilled,
*	ORnoneofthemare.
*
*partnumber:	{skip_or_fill_minimum:[2,".productinfo"]},
*description:{skip_or_fill_minimum:[2,".productinfo"]},
*color:		{skip_or_fill_minimum:[2,".productinfo"]}
*
*options[0]:numberoffieldsthatmustbefilledinthegroup
*options[1]:CSSselectorthatdefinesthegroupofconditionallyrequiredfields
*
*/
$.validator.addMethod("skip_or_fill_minimum",function(value,element,options){
	var$fields=$(options[1],element.form),
		$fieldsFirst=$fields.eq(0),
		validator=$fieldsFirst.data("valid_skip")?$fieldsFirst.data("valid_skip"):$.extend({},this),
		numberFilled=$fields.filter(function(){
			returnvalidator.elementValue(this);
		}).length,
		isValid=numberFilled===0||numberFilled>=options[0];

	//Storetheclonedvalidatorforfuturevalidation
	$fieldsFirst.data("valid_skip",validator);

	//Ifelementisn'tbeingvalidated,runeachskip_or_fill_minimumfield'svalidationrules
	if(!$(element).data("being_validated")){
		$fields.data("being_validated",true);
		$fields.each(function(){
			validator.element(this);
		});
		$fields.data("being_validated",false);
	}
	returnisValid;
},$.validator.format("Pleaseeitherskipthesefieldsorfillatleast{0}ofthem."));

/*ValidatesUSStatesand/orTerritoriesby@jdforsythe
*Canbecaseinsensitiveorrequirecapitalization-defaultiscaseinsensitive
*CanincludeUSTerritoriesornot-defaultdoesnot
*CanincludeUSMilitarypostalabbreviations(AA,AE,AP)-defaultdoesnot
*
*Note:"States"alwaysincludesDC(DistrictofColombia)
*
*Usageexamples:
*
*Thisisthedefault-caseinsensitive,noterritories,nomilitaryzones
*stateInput:{
*caseSensitive:false,
*includeTerritories:false,
*includeMilitary:false
*}
*
*Onlyallowcapitalletters,noterritories,nomilitaryzones
*stateInput:{
*caseSensitive:false
*}
*
*Caseinsensitive,includeterritoriesbutnotmilitaryzones
*stateInput:{
*includeTerritories:true
*}
*
*Onlyallowcapitalletters,includeterritoriesandmilitaryzones
*stateInput:{
*caseSensitive:true,
*includeTerritories:true,
*includeMilitary:true
*}
*
*/
$.validator.addMethod("stateUS",function(value,element,options){
	varisDefault=typeofoptions==="undefined",
		caseSensitive=(isDefault||typeofoptions.caseSensitive==="undefined")?false:options.caseSensitive,
		includeTerritories=(isDefault||typeofoptions.includeTerritories==="undefined")?false:options.includeTerritories,
		includeMilitary=(isDefault||typeofoptions.includeMilitary==="undefined")?false:options.includeMilitary,
		regex;

	if(!includeTerritories&&!includeMilitary){
		regex="^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	}elseif(includeTerritories&&includeMilitary){
		regex="^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	}elseif(includeTerritories){
		regex="^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	}else{
		regex="^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	}

	regex=caseSensitive?newRegExp(regex):newRegExp(regex,"i");
	returnthis.optional(element)||regex.test(value);
},"Pleasespecifyavalidstate");

//TODOcheckifvaluestartswith<,otherwisedon'ttrystrippinganything
$.validator.addMethod("strippedminlength",function(value,element,param){
	return$(value).text().length>=param;
},$.validator.format("Pleaseenteratleast{0}characters"));

$.validator.addMethod("time",function(value,element){
	returnthis.optional(element)||/^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(value);
},"Pleaseenteravalidtime,between00:00and23:59");

$.validator.addMethod("time12h",function(value,element){
	returnthis.optional(element)||/^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\?[AP]M))$/i.test(value);
},"Pleaseenteravalidtimein12-houram/pmformat");

//Sameasurl,butTLDisoptional
$.validator.addMethod("url2",function(value,element){
	returnthis.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
},$.validator.messages.url);

/**
*Returntrue,ifthevalueisavalidvehicleidentificationnumber(VIN).
*
*Workswithallkindoftextinputs.
*
*@example<inputtype="text"size="20"name="VehicleID"class="{required:true,vinUS:true}"/>
*@descDeclaresarequiredinputelementwhosevaluemustbeavalidvehicleidentificationnumber.
*
*@name$.validator.methods.vinUS
*@typeBoolean
*@catPlugins/Validate/Methods
*/
$.validator.addMethod("vinUS",function(v){
	if(v.length!==17){
		returnfalse;
	}

	varLL=["A","B","C","D","E","F","G","H","J","K","L","M","N","P","R","S","T","U","V","W","X","Y","Z"],
		VL=[1,2,3,4,5,6,7,8,1,2,3,4,5,7,9,2,3,4,5,6,7,8,9],
		FL=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2],
		rs=0,
		i,n,d,f,cd,cdv;

	for(i=0;i<17;i++){
		f=FL[i];
		d=v.slice(i,i+1);
		if(i===8){
			cdv=d;
		}
		if(!isNaN(d)){
			d*=f;
		}else{
			for(n=0;n<LL.length;n++){
				if(d.toUpperCase()===LL[n]){
					d=VL[n];
					d*=f;
					if(isNaN(cdv)&&n===8){
						cdv=LL[n];
					}
					break;
				}
			}
		}
		rs+=d;
	}
	cd=rs%11;
	if(cd===10){
		cd="X";
	}
	if(cd===cdv){
		returntrue;
	}
	returnfalse;
},"Thespecifiedvehicleidentificationnumber(VIN)isinvalid.");

$.validator.addMethod("zipcodeUS",function(value,element){
	returnthis.optional(element)||/^\d{5}(-\d{4})?$/.test(value);
},"ThespecifiedUSZIPCodeisinvalid");

$.validator.addMethod("ziprange",function(value,element){
	returnthis.optional(element)||/^90[2-5]\d\{2\}-\d{4}$/.test(value);
},"YourZIP-codemustbeintherange902xx-xxxxto905xx-xxxx");
return$;
}));