/*!
*Bootstrapv5.1.0(https://getbootstrap.com/)
*Copyright2011-2021TheBootstrapAuthors(https://github.com/twbs/bootstrap/graphs/contributors)
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/
(function(global,factory){
typeofexports==='object'&&typeofmodule!=='undefined'?module.exports=factory():
typeofdefine==='function'&&define.amd?define(factory):
(global=typeofglobalThis!=='undefined'?globalThis:global||self,global.bootstrap=factory());
}(this,(function(){'usestrict';

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):util/index.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
constMAX_UID=1000000;
constMILLISECONDS_MULTIPLIER=1000;
constTRANSITION_END='transitionend';//ShoutoutAngusCroll(https://goo.gl/pxwQGp)

consttoType=obj=>{
if(obj===null||obj===undefined){
return`${obj}`;
}

return{}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
*--------------------------------------------------------------------------
*PublicUtilApi
*--------------------------------------------------------------------------
*/


constgetUID=prefix=>{
do{
prefix+=Math.floor(Math.random()*MAX_UID);
}while(document.getElementById(prefix));

returnprefix;
};

constgetSelector=element=>{
letselector=element.getAttribute('data-bs-target');

if(!selector||selector==='#'){
lethrefAttr=element.getAttribute('href');//TheonlyvalidcontentthatcoulddoubleasaselectorareIDsorclasses,
//soeverythingstartingwith`#`or`.`.Ifa"real"URLisusedastheselector,
//`document.querySelector`willrightfullycomplainitisinvalid.
//Seehttps://github.com/twbs/bootstrap/issues/32273

if(!hrefAttr||!hrefAttr.includes('#')&&!hrefAttr.startsWith('.')){
returnnull;
}//JustincasesomeCMSputsoutafullURLwiththeanchorappended


if(hrefAttr.includes('#')&&!hrefAttr.startsWith('#')){
hrefAttr=`#${hrefAttr.split('#')[1]}`;
}

selector=hrefAttr&&hrefAttr!=='#'?hrefAttr.trim():null;
}

returnselector;
};

constgetSelectorFromElement=element=>{
constselector=getSelector(element);

if(selector){
returndocument.querySelector(selector)?selector:null;
}

returnnull;
};

constgetElementFromSelector=element=>{
constselector=getSelector(element);
returnselector?document.querySelector(selector):null;
};

constgetTransitionDurationFromElement=element=>{
if(!element){
return0;
}//Gettransition-durationoftheelement


let{
transitionDuration,
transitionDelay
}=window.getComputedStyle(element);
constfloatTransitionDuration=Number.parseFloat(transitionDuration);
constfloatTransitionDelay=Number.parseFloat(transitionDelay);//Return0ifelementortransitiondurationisnotfound

if(!floatTransitionDuration&&!floatTransitionDelay){
return0;
}//Ifmultipledurationsaredefined,takethefirst


transitionDuration=transitionDuration.split(',')[0];
transitionDelay=transitionDelay.split(',')[0];
return(Number.parseFloat(transitionDuration)+Number.parseFloat(transitionDelay))*MILLISECONDS_MULTIPLIER;
};

consttriggerTransitionEnd=element=>{
element.dispatchEvent(newEvent(TRANSITION_END));
};

constisElement$1=obj=>{
if(!obj||typeofobj!=='object'){
returnfalse;
}

if(typeofobj.jquery!=='undefined'){
obj=obj[0];
}

returntypeofobj.nodeType!=='undefined';
};

constgetElement=obj=>{
if(isElement$1(obj)){
//it'sajQueryobjectoranodeelement
returnobj.jquery?obj[0]:obj;
}

if(typeofobj==='string'&&obj.length>0){
returndocument.querySelector(obj);
}

returnnull;
};

consttypeCheckConfig=(componentName,config,configTypes)=>{
Object.keys(configTypes).forEach(property=>{
constexpectedTypes=configTypes[property];
constvalue=config[property];
constvalueType=value&&isElement$1(value)?'element':toType(value);

if(!newRegExp(expectedTypes).test(valueType)){
thrownewTypeError(`${componentName.toUpperCase()}:Option"${property}"providedtype"${valueType}"butexpectedtype"${expectedTypes}".`);
}
});
};

constisVisible=element=>{
if(!isElement$1(element)||element.getClientRects().length===0){
returnfalse;
}

returngetComputedStyle(element).getPropertyValue('visibility')==='visible';
};

constisDisabled=element=>{
if(!element||element.nodeType!==Node.ELEMENT_NODE){
returntrue;
}

if(element.classList.contains('disabled')){
returntrue;
}

if(typeofelement.disabled!=='undefined'){
returnelement.disabled;
}

returnelement.hasAttribute('disabled')&&element.getAttribute('disabled')!=='false';
};

constfindShadowRoot=element=>{
if(!document.documentElement.attachShadow){
returnnull;
}//Canfindtheshadowroototherwiseit'llreturnthedocument


if(typeofelement.getRootNode==='function'){
constroot=element.getRootNode();
returnrootinstanceofShadowRoot?root:null;
}

if(elementinstanceofShadowRoot){
returnelement;
}//whenwedon'tfindashadowroot


if(!element.parentNode){
returnnull;
}

returnfindShadowRoot(element.parentNode);
};

constnoop=()=>{};
/**
*Tricktorestartanelement'sanimation
*
*@param{HTMLElement}element
*@returnvoid
*
*@seehttps://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
*/


constreflow=element=>{
//eslint-disable-next-lineno-unused-expressions
element.offsetHeight;
};

constgetjQuery=()=>{
const{
jQuery
}=window;

if(jQuery&&!document.body.hasAttribute('data-bs-no-jquery')){
returnjQuery;
}

returnnull;
};

constDOMContentLoadedCallbacks=[];

constonDOMContentLoaded=callback=>{
if(document.readyState==='loading'){
//addlisteneronthefirstcallwhenthedocumentisinloadingstate
if(!DOMContentLoadedCallbacks.length){
document.addEventListener('DOMContentLoaded',()=>{
DOMContentLoadedCallbacks.forEach(callback=>callback());
});
}

DOMContentLoadedCallbacks.push(callback);
}else{
callback();
}
};

constisRTL=()=>document.documentElement.dir==='rtl';

constdefineJQueryPlugin=plugin=>{
onDOMContentLoaded(()=>{
const$=getjQuery();
/*istanbulignoreif*/

if($){
constname=plugin.NAME;
constJQUERY_NO_CONFLICT=$.fn[name];
$.fn[name]=plugin.jQueryInterface;
$.fn[name].Constructor=plugin;

$.fn[name].noConflict=()=>{
$.fn[name]=JQUERY_NO_CONFLICT;
returnplugin.jQueryInterface;
};
}
});
};

constexecute=callback=>{
if(typeofcallback==='function'){
callback();
}
};

constexecuteAfterTransition=(callback,transitionElement,waitForTransition=true)=>{
if(!waitForTransition){
execute(callback);
return;
}

constdurationPadding=5;
constemulatedDuration=getTransitionDurationFromElement(transitionElement)+durationPadding;
letcalled=false;

consthandler=({
target
})=>{
if(target!==transitionElement){
return;
}

called=true;
transitionElement.removeEventListener(TRANSITION_END,handler);
execute(callback);
};

transitionElement.addEventListener(TRANSITION_END,handler);
setTimeout(()=>{
if(!called){
triggerTransitionEnd(transitionElement);
}
},emulatedDuration);
};
/**
*Returntheprevious/nextelementofalist.
*
*@param{array}listThelistofelements
*@paramactiveElementTheactiveelement
*@paramshouldGetNextChoosetogetnextorpreviouselement
*@paramisCycleAllowed
*@return{Element|elem}Theproperelement
*/


constgetNextActiveElement=(list,activeElement,shouldGetNext,isCycleAllowed)=>{
letindex=list.indexOf(activeElement);//iftheelementdoesnotexistinthelistreturnanelementdependingonthedirectionandifcycleisallowed

if(index===-1){
returnlist[!shouldGetNext&&isCycleAllowed?list.length-1:0];
}

constlistLength=list.length;
index+=shouldGetNext?1:-1;

if(isCycleAllowed){
index=(index+listLength)%listLength;
}

returnlist[Math.max(0,Math.min(index,listLength-1))];
};

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):dom/event-handler.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constnamespaceRegex=/[^.]*(?=\..*)\.|.*/;
conststripNameRegex=/\..*/;
conststripUidRegex=/::\d+$/;
consteventRegistry={};//Eventsstorage

letuidEvent=1;
constcustomEvents={
mouseenter:'mouseover',
mouseleave:'mouseout'
};
constcustomEventsRegex=/^(mouseenter|mouseleave)/i;
constnativeEvents=newSet(['click','dblclick','mouseup','mousedown','contextmenu','mousewheel','DOMMouseScroll','mouseover','mouseout','mousemove','selectstart','selectend','keydown','keypress','keyup','orientationchange','touchstart','touchmove','touchend','touchcancel','pointerdown','pointermove','pointerup','pointerleave','pointercancel','gesturestart','gesturechange','gestureend','focus','blur','change','reset','select','submit','focusin','focusout','load','unload','beforeunload','resize','move','DOMContentLoaded','readystatechange','error','abort','scroll']);
/**
*------------------------------------------------------------------------
*Privatemethods
*------------------------------------------------------------------------
*/

functiongetUidEvent(element,uid){
returnuid&&`${uid}::${uidEvent++}`||element.uidEvent||uidEvent++;
}

functiongetEvent(element){
constuid=getUidEvent(element);
element.uidEvent=uid;
eventRegistry[uid]=eventRegistry[uid]||{};
returneventRegistry[uid];
}

functionbootstrapHandler(element,fn){
returnfunctionhandler(event){
event.delegateTarget=element;

if(handler.oneOff){
EventHandler.off(element,event.type,fn);
}

returnfn.apply(element,[event]);
};
}

functionbootstrapDelegationHandler(element,selector,fn){
returnfunctionhandler(event){
constdomElements=element.querySelectorAll(selector);

for(let{
target
}=event;target&&target!==this;target=target.parentNode){
for(leti=domElements.length;i--;){
if(domElements[i]===target){
event.delegateTarget=target;

if(handler.oneOff){
//eslint-disable-next-lineunicorn/consistent-destructuring
EventHandler.off(element,event.type,selector,fn);
}

returnfn.apply(target,[event]);
}
}
}//TopleaseESLint


returnnull;
};
}

functionfindHandler(events,handler,delegationSelector=null){
constuidEventList=Object.keys(events);

for(leti=0,len=uidEventList.length;i<len;i++){
constevent=events[uidEventList[i]];

if(event.originalHandler===handler&&event.delegationSelector===delegationSelector){
returnevent;
}
}

returnnull;
}

functionnormalizeParams(originalTypeEvent,handler,delegationFn){
constdelegation=typeofhandler==='string';
constoriginalHandler=delegation?delegationFn:handler;
lettypeEvent=getTypeEvent(originalTypeEvent);
constisNative=nativeEvents.has(typeEvent);

if(!isNative){
typeEvent=originalTypeEvent;
}

return[delegation,originalHandler,typeEvent];
}

functionaddHandler(element,originalTypeEvent,handler,delegationFn,oneOff){
if(typeoforiginalTypeEvent!=='string'||!element){
return;
}

if(!handler){
handler=delegationFn;
delegationFn=null;
}//incaseofmouseenterormouseleavewrapthehandlerwithinafunctionthatchecksforitsDOMposition
//thispreventsthehandlerfrombeingdispatchedthesamewayasmouseoverormouseoutdoes


if(customEventsRegex.test(originalTypeEvent)){
constwrapFn=fn=>{
returnfunction(event){
if(!event.relatedTarget||event.relatedTarget!==event.delegateTarget&&!event.delegateTarget.contains(event.relatedTarget)){
returnfn.call(this,event);
}
};
};

if(delegationFn){
delegationFn=wrapFn(delegationFn);
}else{
handler=wrapFn(handler);
}
}

const[delegation,originalHandler,typeEvent]=normalizeParams(originalTypeEvent,handler,delegationFn);
constevents=getEvent(element);
consthandlers=events[typeEvent]||(events[typeEvent]={});
constpreviousFn=findHandler(handlers,originalHandler,delegation?handler:null);

if(previousFn){
previousFn.oneOff=previousFn.oneOff&&oneOff;
return;
}

constuid=getUidEvent(originalHandler,originalTypeEvent.replace(namespaceRegex,''));
constfn=delegation?bootstrapDelegationHandler(element,handler,delegationFn):bootstrapHandler(element,handler);
fn.delegationSelector=delegation?handler:null;
fn.originalHandler=originalHandler;
fn.oneOff=oneOff;
fn.uidEvent=uid;
handlers[uid]=fn;
element.addEventListener(typeEvent,fn,delegation);
}

functionremoveHandler(element,events,typeEvent,handler,delegationSelector){
constfn=findHandler(events[typeEvent],handler,delegationSelector);

if(!fn){
return;
}

element.removeEventListener(typeEvent,fn,Boolean(delegationSelector));
deleteevents[typeEvent][fn.uidEvent];
}

functionremoveNamespacedHandlers(element,events,typeEvent,namespace){
conststoreElementEvent=events[typeEvent]||{};
Object.keys(storeElementEvent).forEach(handlerKey=>{
if(handlerKey.includes(namespace)){
constevent=storeElementEvent[handlerKey];
removeHandler(element,events,typeEvent,event.originalHandler,event.delegationSelector);
}
});
}

functiongetTypeEvent(event){
//allowtogetthenativeeventsfromnamespacedevents('click.bs.button'-->'click')
event=event.replace(stripNameRegex,'');
returncustomEvents[event]||event;
}

constEventHandler={
on(element,event,handler,delegationFn){
addHandler(element,event,handler,delegationFn,false);
},

one(element,event,handler,delegationFn){
addHandler(element,event,handler,delegationFn,true);
},

off(element,originalTypeEvent,handler,delegationFn){
if(typeoforiginalTypeEvent!=='string'||!element){
return;
}

const[delegation,originalHandler,typeEvent]=normalizeParams(originalTypeEvent,handler,delegationFn);
constinNamespace=typeEvent!==originalTypeEvent;
constevents=getEvent(element);
constisNamespace=originalTypeEvent.startsWith('.');

if(typeoforiginalHandler!=='undefined'){
//Simplestcase:handlerispassed,removethatlistenerONLY.
if(!events||!events[typeEvent]){
return;
}

removeHandler(element,events,typeEvent,originalHandler,delegation?handler:null);
return;
}

if(isNamespace){
Object.keys(events).forEach(elementEvent=>{
removeNamespacedHandlers(element,events,elementEvent,originalTypeEvent.slice(1));
});
}

conststoreElementEvent=events[typeEvent]||{};
Object.keys(storeElementEvent).forEach(keyHandlers=>{
consthandlerKey=keyHandlers.replace(stripUidRegex,'');

if(!inNamespace||originalTypeEvent.includes(handlerKey)){
constevent=storeElementEvent[keyHandlers];
removeHandler(element,events,typeEvent,event.originalHandler,event.delegationSelector);
}
});
},

trigger(element,event,args){
if(typeofevent!=='string'||!element){
returnnull;
}

const$=getjQuery();
consttypeEvent=getTypeEvent(event);
constinNamespace=event!==typeEvent;
constisNative=nativeEvents.has(typeEvent);
letjQueryEvent;
letbubbles=true;
letnativeDispatch=true;
letdefaultPrevented=false;
letevt=null;

if(inNamespace&&$){
jQueryEvent=$.Event(event,args);
$(element).trigger(jQueryEvent);
bubbles=!jQueryEvent.isPropagationStopped();
nativeDispatch=!jQueryEvent.isImmediatePropagationStopped();
defaultPrevented=jQueryEvent.isDefaultPrevented();
}

if(isNative){
evt=document.createEvent('HTMLEvents');
evt.initEvent(typeEvent,bubbles,true);
}else{
evt=newCustomEvent(event,{
bubbles,
cancelable:true
});
}//mergecustominformationinourevent


if(typeofargs!=='undefined'){
Object.keys(args).forEach(key=>{
Object.defineProperty(evt,key,{
get(){
returnargs[key];
}

});
});
}

if(defaultPrevented){
evt.preventDefault();
}

if(nativeDispatch){
element.dispatchEvent(evt);
}

if(evt.defaultPrevented&&typeofjQueryEvent!=='undefined'){
jQueryEvent.preventDefault();
}

returnevt;
}

};

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):dom/data.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/

/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/
constelementMap=newMap();
varData={
set(element,key,instance){
if(!elementMap.has(element)){
elementMap.set(element,newMap());
}

constinstanceMap=elementMap.get(element);//makeitclearweonlywantoneinstanceperelement
//canberemovedlaterwhenmultiplekey/instancesarefinetobeused

if(!instanceMap.has(key)&&instanceMap.size!==0){
//eslint-disable-next-lineno-console
console.error(`Bootstrapdoesn'tallowmorethanoneinstanceperelement.Boundinstance:${Array.from(instanceMap.keys())[0]}.`);
return;
}

instanceMap.set(key,instance);
},

get(element,key){
if(elementMap.has(element)){
returnelementMap.get(element).get(key)||null;
}

returnnull;
},

remove(element,key){
if(!elementMap.has(element)){
return;
}

constinstanceMap=elementMap.get(element);
instanceMap.delete(key);//freeupelementreferencesiftherearenoinstancesleftforanelement

if(instanceMap.size===0){
elementMap.delete(element);
}
}

};

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):base-component.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constVERSION='5.1.0';

classBaseComponent{
constructor(element){
element=getElement(element);

if(!element){
return;
}

this._element=element;
Data.set(this._element,this.constructor.DATA_KEY,this);
}

dispose(){
Data.remove(this._element,this.constructor.DATA_KEY);
EventHandler.off(this._element,this.constructor.EVENT_KEY);
Object.getOwnPropertyNames(this).forEach(propertyName=>{
this[propertyName]=null;
});
}

_queueCallback(callback,element,isAnimated=true){
executeAfterTransition(callback,element,isAnimated);
}
/**Static*/


staticgetInstance(element){
returnData.get(getElement(element),this.DATA_KEY);
}

staticgetOrCreateInstance(element,config={}){
returnthis.getInstance(element)||newthis(element,typeofconfig==='object'?config:null);
}

staticgetVERSION(){
returnVERSION;
}

staticgetNAME(){
thrownewError('Youhavetoimplementthestaticmethod"NAME",foreachcomponent!');
}

staticgetDATA_KEY(){
return`bs.${this.NAME}`;
}

staticgetEVENT_KEY(){
return`.${this.DATA_KEY}`;
}

}

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):util/component-functions.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/

constenableDismissTrigger=(component,method='hide')=>{
constclickEvent=`click.dismiss${component.EVENT_KEY}`;
constname=component.NAME;
EventHandler.on(document,clickEvent,`[data-bs-dismiss="${name}"]`,function(event){
if(['A','AREA'].includes(this.tagName)){
event.preventDefault();
}

if(isDisabled(this)){
return;
}

consttarget=getElementFromSelector(this)||this.closest(`.${name}`);
constinstance=component.getOrCreateInstance(target);//Methodargumentisleft,forAlertandonly,asitdoesn'timplementthe'hide'method

instance[method]();
});
};

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):alert.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$d='alert';
constDATA_KEY$c='bs.alert';
constEVENT_KEY$c=`.${DATA_KEY$c}`;
constEVENT_CLOSE=`close${EVENT_KEY$c}`;
constEVENT_CLOSED=`closed${EVENT_KEY$c}`;
constCLASS_NAME_FADE$5='fade';
constCLASS_NAME_SHOW$8='show';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classAlertextendsBaseComponent{
//Getters
staticgetNAME(){
returnNAME$d;
}//Public


close(){
constcloseEvent=EventHandler.trigger(this._element,EVENT_CLOSE);

if(closeEvent.defaultPrevented){
return;
}

this._element.classList.remove(CLASS_NAME_SHOW$8);

constisAnimated=this._element.classList.contains(CLASS_NAME_FADE$5);

this._queueCallback(()=>this._destroyElement(),this._element,isAnimated);
}//Private


_destroyElement(){
this._element.remove();

EventHandler.trigger(this._element,EVENT_CLOSED);
this.dispose();
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Alert.getOrCreateInstance(this);

if(typeofconfig!=='string'){
return;
}

if(data[config]===undefined||config.startsWith('_')||config==='constructor'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config](this);
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


enableDismissTrigger(Alert,'close');
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.AlerttojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Alert);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):button.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$c='button';
constDATA_KEY$b='bs.button';
constEVENT_KEY$b=`.${DATA_KEY$b}`;
constDATA_API_KEY$7='.data-api';
constCLASS_NAME_ACTIVE$3='active';
constSELECTOR_DATA_TOGGLE$5='[data-bs-toggle="button"]';
constEVENT_CLICK_DATA_API$6=`click${EVENT_KEY$b}${DATA_API_KEY$7}`;
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classButtonextendsBaseComponent{
//Getters
staticgetNAME(){
returnNAME$c;
}//Public


toggle(){
//Toggleclassandsyncthe`aria-pressed`attributewiththereturnvalueofthe`.toggle()`method
this._element.setAttribute('aria-pressed',this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Button.getOrCreateInstance(this);

if(config==='toggle'){
data[config]();
}
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_CLICK_DATA_API$6,SELECTOR_DATA_TOGGLE$5,event=>{
event.preventDefault();
constbutton=event.target.closest(SELECTOR_DATA_TOGGLE$5);
constdata=Button.getOrCreateInstance(button);
data.toggle();
});
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.ButtontojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Button);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):dom/manipulator.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
functionnormalizeData(val){
if(val==='true'){
returntrue;
}

if(val==='false'){
returnfalse;
}

if(val===Number(val).toString()){
returnNumber(val);
}

if(val===''||val==='null'){
returnnull;
}

returnval;
}

functionnormalizeDataKey(key){
returnkey.replace(/[A-Z]/g,chr=>`-${chr.toLowerCase()}`);
}

constManipulator={
setDataAttribute(element,key,value){
element.setAttribute(`data-bs-${normalizeDataKey(key)}`,value);
},

removeDataAttribute(element,key){
element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
},

getDataAttributes(element){
if(!element){
return{};
}

constattributes={};
Object.keys(element.dataset).filter(key=>key.startsWith('bs')).forEach(key=>{
letpureKey=key.replace(/^bs/,'');
pureKey=pureKey.charAt(0).toLowerCase()+pureKey.slice(1,pureKey.length);
attributes[pureKey]=normalizeData(element.dataset[key]);
});
returnattributes;
},

getDataAttribute(element,key){
returnnormalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
},

offset(element){
constrect=element.getBoundingClientRect();
return{
top:rect.top+window.pageYOffset,
left:rect.left+window.pageXOffset
};
},

position(element){
return{
top:element.offsetTop,
left:element.offsetLeft
};
}

};

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):dom/selector-engine.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
constNODE_TEXT=3;
constSelectorEngine={
find(selector,element=document.documentElement){
return[].concat(...Element.prototype.querySelectorAll.call(element,selector));
},

findOne(selector,element=document.documentElement){
returnElement.prototype.querySelector.call(element,selector);
},

children(element,selector){
return[].concat(...element.children).filter(child=>child.matches(selector));
},

parents(element,selector){
constparents=[];
letancestor=element.parentNode;

while(ancestor&&ancestor.nodeType===Node.ELEMENT_NODE&&ancestor.nodeType!==NODE_TEXT){
if(ancestor.matches(selector)){
parents.push(ancestor);
}

ancestor=ancestor.parentNode;
}

returnparents;
},

prev(element,selector){
letprevious=element.previousElementSibling;

while(previous){
if(previous.matches(selector)){
return[previous];
}

previous=previous.previousElementSibling;
}

return[];
},

next(element,selector){
letnext=element.nextElementSibling;

while(next){
if(next.matches(selector)){
return[next];
}

next=next.nextElementSibling;
}

return[];
},

focusableChildren(element){
constfocusables=['a','button','input','textarea','select','details','[tabindex]','[contenteditable="true"]'].map(selector=>`${selector}:not([tabindex^="-"])`).join(',');
returnthis.find(focusables,element).filter(el=>!isDisabled(el)&&isVisible(el));
}

};

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):carousel.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$b='carousel';
constDATA_KEY$a='bs.carousel';
constEVENT_KEY$a=`.${DATA_KEY$a}`;
constDATA_API_KEY$6='.data-api';
constARROW_LEFT_KEY='ArrowLeft';
constARROW_RIGHT_KEY='ArrowRight';
constTOUCHEVENT_COMPAT_WAIT=500;//Timeformousecompateventstofireaftertouch

constSWIPE_THRESHOLD=40;
constDefault$a={
interval:5000,
keyboard:true,
slide:false,
pause:'hover',
wrap:true,
touch:true
};
constDefaultType$a={
interval:'(number|boolean)',
keyboard:'boolean',
slide:'(boolean|string)',
pause:'(string|boolean)',
wrap:'boolean',
touch:'boolean'
};
constORDER_NEXT='next';
constORDER_PREV='prev';
constDIRECTION_LEFT='left';
constDIRECTION_RIGHT='right';
constKEY_TO_DIRECTION={
[ARROW_LEFT_KEY]:DIRECTION_RIGHT,
[ARROW_RIGHT_KEY]:DIRECTION_LEFT
};
constEVENT_SLIDE=`slide${EVENT_KEY$a}`;
constEVENT_SLID=`slid${EVENT_KEY$a}`;
constEVENT_KEYDOWN=`keydown${EVENT_KEY$a}`;
constEVENT_MOUSEENTER=`mouseenter${EVENT_KEY$a}`;
constEVENT_MOUSELEAVE=`mouseleave${EVENT_KEY$a}`;
constEVENT_TOUCHSTART=`touchstart${EVENT_KEY$a}`;
constEVENT_TOUCHMOVE=`touchmove${EVENT_KEY$a}`;
constEVENT_TOUCHEND=`touchend${EVENT_KEY$a}`;
constEVENT_POINTERDOWN=`pointerdown${EVENT_KEY$a}`;
constEVENT_POINTERUP=`pointerup${EVENT_KEY$a}`;
constEVENT_DRAG_START=`dragstart${EVENT_KEY$a}`;
constEVENT_LOAD_DATA_API$2=`load${EVENT_KEY$a}${DATA_API_KEY$6}`;
constEVENT_CLICK_DATA_API$5=`click${EVENT_KEY$a}${DATA_API_KEY$6}`;
constCLASS_NAME_CAROUSEL='carousel';
constCLASS_NAME_ACTIVE$2='active';
constCLASS_NAME_SLIDE='slide';
constCLASS_NAME_END='carousel-item-end';
constCLASS_NAME_START='carousel-item-start';
constCLASS_NAME_NEXT='carousel-item-next';
constCLASS_NAME_PREV='carousel-item-prev';
constCLASS_NAME_POINTER_EVENT='pointer-event';
constSELECTOR_ACTIVE$1='.active';
constSELECTOR_ACTIVE_ITEM='.active.carousel-item';
constSELECTOR_ITEM='.carousel-item';
constSELECTOR_ITEM_IMG='.carousel-itemimg';
constSELECTOR_NEXT_PREV='.carousel-item-next,.carousel-item-prev';
constSELECTOR_INDICATORS='.carousel-indicators';
constSELECTOR_INDICATOR='[data-bs-target]';
constSELECTOR_DATA_SLIDE='[data-bs-slide],[data-bs-slide-to]';
constSELECTOR_DATA_RIDE='[data-bs-ride="carousel"]';
constPOINTER_TYPE_TOUCH='touch';
constPOINTER_TYPE_PEN='pen';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classCarouselextendsBaseComponent{
constructor(element,config){
super(element);
this._items=null;
this._interval=null;
this._activeElement=null;
this._isPaused=false;
this._isSliding=false;
this.touchTimeout=null;
this.touchStartX=0;
this.touchDeltaX=0;
this._config=this._getConfig(config);
this._indicatorsElement=SelectorEngine.findOne(SELECTOR_INDICATORS,this._element);
this._touchSupported='ontouchstart'indocument.documentElement||navigator.maxTouchPoints>0;
this._pointerEvent=Boolean(window.PointerEvent);

this._addEventListeners();
}//Getters


staticgetDefault(){
returnDefault$a;
}

staticgetNAME(){
returnNAME$b;
}//Public


next(){
this._slide(ORDER_NEXT);
}

nextWhenVisible(){
//Don'tcallnextwhenthepageisn'tvisible
//orthecarouseloritsparentisn'tvisible
if(!document.hidden&&isVisible(this._element)){
this.next();
}
}

prev(){
this._slide(ORDER_PREV);
}

pause(event){
if(!event){
this._isPaused=true;
}

if(SelectorEngine.findOne(SELECTOR_NEXT_PREV,this._element)){
triggerTransitionEnd(this._element);
this.cycle(true);
}

clearInterval(this._interval);
this._interval=null;
}

cycle(event){
if(!event){
this._isPaused=false;
}

if(this._interval){
clearInterval(this._interval);
this._interval=null;
}

if(this._config&&this._config.interval&&!this._isPaused){
this._updateInterval();

this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval);
}
}

to(index){
this._activeElement=SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM,this._element);

constactiveIndex=this._getItemIndex(this._activeElement);

if(index>this._items.length-1||index<0){
return;
}

if(this._isSliding){
EventHandler.one(this._element,EVENT_SLID,()=>this.to(index));
return;
}

if(activeIndex===index){
this.pause();
this.cycle();
return;
}

constorder=index>activeIndex?ORDER_NEXT:ORDER_PREV;

this._slide(order,this._items[index]);
}//Private


_getConfig(config){
config={...Default$a,
...Manipulator.getDataAttributes(this._element),
...(typeofconfig==='object'?config:{})
};
typeCheckConfig(NAME$b,config,DefaultType$a);
returnconfig;
}

_handleSwipe(){
constabsDeltax=Math.abs(this.touchDeltaX);

if(absDeltax<=SWIPE_THRESHOLD){
return;
}

constdirection=absDeltax/this.touchDeltaX;
this.touchDeltaX=0;

if(!direction){
return;
}

this._slide(direction>0?DIRECTION_RIGHT:DIRECTION_LEFT);
}

_addEventListeners(){
if(this._config.keyboard){
EventHandler.on(this._element,EVENT_KEYDOWN,event=>this._keydown(event));
}

if(this._config.pause==='hover'){
EventHandler.on(this._element,EVENT_MOUSEENTER,event=>this.pause(event));
EventHandler.on(this._element,EVENT_MOUSELEAVE,event=>this.cycle(event));
}

if(this._config.touch&&this._touchSupported){
this._addTouchEventListeners();
}
}

_addTouchEventListeners(){
conststart=event=>{
if(this._pointerEvent&&(event.pointerType===POINTER_TYPE_PEN||event.pointerType===POINTER_TYPE_TOUCH)){
this.touchStartX=event.clientX;
}elseif(!this._pointerEvent){
this.touchStartX=event.touches[0].clientX;
}
};

constmove=event=>{
//ensureswipingwithonetouchandnotpinching
this.touchDeltaX=event.touches&&event.touches.length>1?0:event.touches[0].clientX-this.touchStartX;
};

constend=event=>{
if(this._pointerEvent&&(event.pointerType===POINTER_TYPE_PEN||event.pointerType===POINTER_TYPE_TOUCH)){
this.touchDeltaX=event.clientX-this.touchStartX;
}

this._handleSwipe();

if(this._config.pause==='hover'){
//Ifit'satouch-enableddevice,mouseenter/leavearefiredas
//partofthemousecompatibilityeventsonfirsttap-thecarousel
//wouldstopcyclinguntilusertappedoutofit;
//here,welistenfortouchend,explicitlypausethecarousel
//(asifit'sthesecondtimewetaponit,mouseentercompatevent
//isNOTfired)andafteratimeout(toallowformousecompatibility
//eventstofire)weexplicitlyrestartcycling
this.pause();

if(this.touchTimeout){
clearTimeout(this.touchTimeout);
}

this.touchTimeout=setTimeout(event=>this.cycle(event),TOUCHEVENT_COMPAT_WAIT+this._config.interval);
}
};

SelectorEngine.find(SELECTOR_ITEM_IMG,this._element).forEach(itemImg=>{
EventHandler.on(itemImg,EVENT_DRAG_START,e=>e.preventDefault());
});

if(this._pointerEvent){
EventHandler.on(this._element,EVENT_POINTERDOWN,event=>start(event));
EventHandler.on(this._element,EVENT_POINTERUP,event=>end(event));

this._element.classList.add(CLASS_NAME_POINTER_EVENT);
}else{
EventHandler.on(this._element,EVENT_TOUCHSTART,event=>start(event));
EventHandler.on(this._element,EVENT_TOUCHMOVE,event=>move(event));
EventHandler.on(this._element,EVENT_TOUCHEND,event=>end(event));
}
}

_keydown(event){
if(/input|textarea/i.test(event.target.tagName)){
return;
}

constdirection=KEY_TO_DIRECTION[event.key];

if(direction){
event.preventDefault();

this._slide(direction);
}
}

_getItemIndex(element){
this._items=element&&element.parentNode?SelectorEngine.find(SELECTOR_ITEM,element.parentNode):[];
returnthis._items.indexOf(element);
}

_getItemByOrder(order,activeElement){
constisNext=order===ORDER_NEXT;
returngetNextActiveElement(this._items,activeElement,isNext,this._config.wrap);
}

_triggerSlideEvent(relatedTarget,eventDirectionName){
consttargetIndex=this._getItemIndex(relatedTarget);

constfromIndex=this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM,this._element));

returnEventHandler.trigger(this._element,EVENT_SLIDE,{
relatedTarget,
direction:eventDirectionName,
from:fromIndex,
to:targetIndex
});
}

_setActiveIndicatorElement(element){
if(this._indicatorsElement){
constactiveIndicator=SelectorEngine.findOne(SELECTOR_ACTIVE$1,this._indicatorsElement);
activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
activeIndicator.removeAttribute('aria-current');
constindicators=SelectorEngine.find(SELECTOR_INDICATOR,this._indicatorsElement);

for(leti=0;i<indicators.length;i++){
if(Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'),10)===this._getItemIndex(element)){
indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
indicators[i].setAttribute('aria-current','true');
break;
}
}
}
}

_updateInterval(){
constelement=this._activeElement||SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM,this._element);

if(!element){
return;
}

constelementInterval=Number.parseInt(element.getAttribute('data-bs-interval'),10);

if(elementInterval){
this._config.defaultInterval=this._config.defaultInterval||this._config.interval;
this._config.interval=elementInterval;
}else{
this._config.interval=this._config.defaultInterval||this._config.interval;
}
}

_slide(directionOrOrder,element){
constorder=this._directionToOrder(directionOrOrder);

constactiveElement=SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM,this._element);

constactiveElementIndex=this._getItemIndex(activeElement);

constnextElement=element||this._getItemByOrder(order,activeElement);

constnextElementIndex=this._getItemIndex(nextElement);

constisCycling=Boolean(this._interval);
constisNext=order===ORDER_NEXT;
constdirectionalClassName=isNext?CLASS_NAME_START:CLASS_NAME_END;
constorderClassName=isNext?CLASS_NAME_NEXT:CLASS_NAME_PREV;

consteventDirectionName=this._orderToDirection(order);

if(nextElement&&nextElement.classList.contains(CLASS_NAME_ACTIVE$2)){
this._isSliding=false;
return;
}

if(this._isSliding){
return;
}

constslideEvent=this._triggerSlideEvent(nextElement,eventDirectionName);

if(slideEvent.defaultPrevented){
return;
}

if(!activeElement||!nextElement){
//Someweirdnessishappening,sowebail
return;
}

this._isSliding=true;

if(isCycling){
this.pause();
}

this._setActiveIndicatorElement(nextElement);

this._activeElement=nextElement;

consttriggerSlidEvent=()=>{
EventHandler.trigger(this._element,EVENT_SLID,{
relatedTarget:nextElement,
direction:eventDirectionName,
from:activeElementIndex,
to:nextElementIndex
});
};

if(this._element.classList.contains(CLASS_NAME_SLIDE)){
nextElement.classList.add(orderClassName);
reflow(nextElement);
activeElement.classList.add(directionalClassName);
nextElement.classList.add(directionalClassName);

constcompleteCallBack=()=>{
nextElement.classList.remove(directionalClassName,orderClassName);
nextElement.classList.add(CLASS_NAME_ACTIVE$2);
activeElement.classList.remove(CLASS_NAME_ACTIVE$2,orderClassName,directionalClassName);
this._isSliding=false;
setTimeout(triggerSlidEvent,0);
};

this._queueCallback(completeCallBack,activeElement,true);
}else{
activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
nextElement.classList.add(CLASS_NAME_ACTIVE$2);
this._isSliding=false;
triggerSlidEvent();
}

if(isCycling){
this.cycle();
}
}

_directionToOrder(direction){
if(![DIRECTION_RIGHT,DIRECTION_LEFT].includes(direction)){
returndirection;
}

if(isRTL()){
returndirection===DIRECTION_LEFT?ORDER_PREV:ORDER_NEXT;
}

returndirection===DIRECTION_LEFT?ORDER_NEXT:ORDER_PREV;
}

_orderToDirection(order){
if(![ORDER_NEXT,ORDER_PREV].includes(order)){
returnorder;
}

if(isRTL()){
returnorder===ORDER_PREV?DIRECTION_LEFT:DIRECTION_RIGHT;
}

returnorder===ORDER_PREV?DIRECTION_RIGHT:DIRECTION_LEFT;
}//Static


staticcarouselInterface(element,config){
constdata=Carousel.getOrCreateInstance(element,config);
let{
_config
}=data;

if(typeofconfig==='object'){
_config={..._config,
...config
};
}

constaction=typeofconfig==='string'?config:_config.slide;

if(typeofconfig==='number'){
data.to(config);
}elseif(typeofaction==='string'){
if(typeofdata[action]==='undefined'){
thrownewTypeError(`Nomethodnamed"${action}"`);
}

data[action]();
}elseif(_config.interval&&_config.ride){
data.pause();
data.cycle();
}
}

staticjQueryInterface(config){
returnthis.each(function(){
Carousel.carouselInterface(this,config);
});
}

staticdataApiClickHandler(event){
consttarget=getElementFromSelector(this);

if(!target||!target.classList.contains(CLASS_NAME_CAROUSEL)){
return;
}

constconfig={...Manipulator.getDataAttributes(target),
...Manipulator.getDataAttributes(this)
};
constslideIndex=this.getAttribute('data-bs-slide-to');

if(slideIndex){
config.interval=false;
}

Carousel.carouselInterface(target,config);

if(slideIndex){
Carousel.getInstance(target).to(slideIndex);
}

event.preventDefault();
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_CLICK_DATA_API$5,SELECTOR_DATA_SLIDE,Carousel.dataApiClickHandler);
EventHandler.on(window,EVENT_LOAD_DATA_API$2,()=>{
constcarousels=SelectorEngine.find(SELECTOR_DATA_RIDE);

for(leti=0,len=carousels.length;i<len;i++){
Carousel.carouselInterface(carousels[i],Carousel.getInstance(carousels[i]));
}
});
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.CarouseltojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Carousel);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):collapse.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$a='collapse';
constDATA_KEY$9='bs.collapse';
constEVENT_KEY$9=`.${DATA_KEY$9}`;
constDATA_API_KEY$5='.data-api';
constDefault$9={
toggle:true,
parent:null
};
constDefaultType$9={
toggle:'boolean',
parent:'(null|element)'
};
constEVENT_SHOW$5=`show${EVENT_KEY$9}`;
constEVENT_SHOWN$5=`shown${EVENT_KEY$9}`;
constEVENT_HIDE$5=`hide${EVENT_KEY$9}`;
constEVENT_HIDDEN$5=`hidden${EVENT_KEY$9}`;
constEVENT_CLICK_DATA_API$4=`click${EVENT_KEY$9}${DATA_API_KEY$5}`;
constCLASS_NAME_SHOW$7='show';
constCLASS_NAME_COLLAPSE='collapse';
constCLASS_NAME_COLLAPSING='collapsing';
constCLASS_NAME_COLLAPSED='collapsed';
constCLASS_NAME_HORIZONTAL='collapse-horizontal';
constWIDTH='width';
constHEIGHT='height';
constSELECTOR_ACTIVES='.show,.collapsing';
constSELECTOR_DATA_TOGGLE$4='[data-bs-toggle="collapse"]';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classCollapseextendsBaseComponent{
constructor(element,config){
super(element);
this._isTransitioning=false;
this._config=this._getConfig(config);
this._triggerArray=[];
consttoggleList=SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

for(leti=0,len=toggleList.length;i<len;i++){
constelem=toggleList[i];
constselector=getSelectorFromElement(elem);
constfilterElement=SelectorEngine.find(selector).filter(foundElem=>foundElem===this._element);

if(selector!==null&&filterElement.length){
this._selector=selector;

this._triggerArray.push(elem);
}
}

this._initializeChildren();

if(!this._config.parent){
this._addAriaAndCollapsedClass(this._triggerArray,this._isShown());
}

if(this._config.toggle){
this.toggle();
}
}//Getters


staticgetDefault(){
returnDefault$9;
}

staticgetNAME(){
returnNAME$a;
}//Public


toggle(){
if(this._isShown()){
this.hide();
}else{
this.show();
}
}

show(){
if(this._isTransitioning||this._isShown()){
return;
}

letactives=[];
letactivesData;

if(this._config.parent){
constchildren=SelectorEngine.find(`.${CLASS_NAME_COLLAPSE}.${CLASS_NAME_COLLAPSE}`,this._config.parent);
actives=SelectorEngine.find(SELECTOR_ACTIVES,this._config.parent).filter(elem=>!children.includes(elem));//removechildrenifgreaterdepth
}

constcontainer=SelectorEngine.findOne(this._selector);

if(actives.length){
consttempActiveData=actives.find(elem=>container!==elem);
activesData=tempActiveData?Collapse.getInstance(tempActiveData):null;

if(activesData&&activesData._isTransitioning){
return;
}
}

conststartEvent=EventHandler.trigger(this._element,EVENT_SHOW$5);

if(startEvent.defaultPrevented){
return;
}

actives.forEach(elemActive=>{
if(container!==elemActive){
Collapse.getOrCreateInstance(elemActive,{
toggle:false
}).hide();
}

if(!activesData){
Data.set(elemActive,DATA_KEY$9,null);
}
});

constdimension=this._getDimension();

this._element.classList.remove(CLASS_NAME_COLLAPSE);

this._element.classList.add(CLASS_NAME_COLLAPSING);

this._element.style[dimension]=0;

this._addAriaAndCollapsedClass(this._triggerArray,true);

this._isTransitioning=true;

constcomplete=()=>{
this._isTransitioning=false;

this._element.classList.remove(CLASS_NAME_COLLAPSING);

this._element.classList.add(CLASS_NAME_COLLAPSE,CLASS_NAME_SHOW$7);

this._element.style[dimension]='';
EventHandler.trigger(this._element,EVENT_SHOWN$5);
};

constcapitalizedDimension=dimension[0].toUpperCase()+dimension.slice(1);
constscrollSize=`scroll${capitalizedDimension}`;

this._queueCallback(complete,this._element,true);

this._element.style[dimension]=`${this._element[scrollSize]}px`;
}

hide(){
if(this._isTransitioning||!this._isShown()){
return;
}

conststartEvent=EventHandler.trigger(this._element,EVENT_HIDE$5);

if(startEvent.defaultPrevented){
return;
}

constdimension=this._getDimension();

this._element.style[dimension]=`${this._element.getBoundingClientRect()[dimension]}px`;
reflow(this._element);

this._element.classList.add(CLASS_NAME_COLLAPSING);

this._element.classList.remove(CLASS_NAME_COLLAPSE,CLASS_NAME_SHOW$7);

consttriggerArrayLength=this._triggerArray.length;

for(leti=0;i<triggerArrayLength;i++){
consttrigger=this._triggerArray[i];
constelem=getElementFromSelector(trigger);

if(elem&&!this._isShown(elem)){
this._addAriaAndCollapsedClass([trigger],false);
}
}

this._isTransitioning=true;

constcomplete=()=>{
this._isTransitioning=false;

this._element.classList.remove(CLASS_NAME_COLLAPSING);

this._element.classList.add(CLASS_NAME_COLLAPSE);

EventHandler.trigger(this._element,EVENT_HIDDEN$5);
};

this._element.style[dimension]='';

this._queueCallback(complete,this._element,true);
}

_isShown(element=this._element){
returnelement.classList.contains(CLASS_NAME_SHOW$7);
}//Private


_getConfig(config){
config={...Default$9,
...Manipulator.getDataAttributes(this._element),
...config
};
config.toggle=Boolean(config.toggle);//Coercestringvalues

config.parent=getElement(config.parent);
typeCheckConfig(NAME$a,config,DefaultType$9);
returnconfig;
}

_getDimension(){
returnthis._element.classList.contains(CLASS_NAME_HORIZONTAL)?WIDTH:HEIGHT;
}

_initializeChildren(){
if(!this._config.parent){
return;
}

constchildren=SelectorEngine.find(`.${CLASS_NAME_COLLAPSE}.${CLASS_NAME_COLLAPSE}`,this._config.parent);
SelectorEngine.find(SELECTOR_DATA_TOGGLE$4,this._config.parent).filter(elem=>!children.includes(elem)).forEach(element=>{
constselected=getElementFromSelector(element);

if(selected){
this._addAriaAndCollapsedClass([element],this._isShown(selected));
}
});
}

_addAriaAndCollapsedClass(triggerArray,isOpen){
if(!triggerArray.length){
return;
}

triggerArray.forEach(elem=>{
if(isOpen){
elem.classList.remove(CLASS_NAME_COLLAPSED);
}else{
elem.classList.add(CLASS_NAME_COLLAPSED);
}

elem.setAttribute('aria-expanded',isOpen);
});
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
const_config={};

if(typeofconfig==='string'&&/show|hide/.test(config)){
_config.toggle=false;
}

constdata=Collapse.getOrCreateInstance(this,_config);

if(typeofconfig==='string'){
if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config]();
}
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_CLICK_DATA_API$4,SELECTOR_DATA_TOGGLE$4,function(event){
//preventDefaultonlyfor<a>elements(whichchangetheURL)notinsidethecollapsibleelement
if(event.target.tagName==='A'||event.delegateTarget&&event.delegateTarget.tagName==='A'){
event.preventDefault();
}

constselector=getSelectorFromElement(this);
constselectorElements=SelectorEngine.find(selector);
selectorElements.forEach(element=>{
Collapse.getOrCreateInstance(element,{
toggle:false
}).toggle();
});
});
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.CollapsetojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Collapse);

vartop='top';
varbottom='bottom';
varright='right';
varleft='left';
varauto='auto';
varbasePlacements=[top,bottom,right,left];
varstart='start';
varend='end';
varclippingParents='clippingParents';
varviewport='viewport';
varpopper='popper';
varreference='reference';
varvariationPlacements=/*#__PURE__*/basePlacements.reduce(function(acc,placement){
returnacc.concat([placement+"-"+start,placement+"-"+end]);
},[]);
varplacements=/*#__PURE__*/[].concat(basePlacements,[auto]).reduce(function(acc,placement){
returnacc.concat([placement,placement+"-"+start,placement+"-"+end]);
},[]);//modifiersthatneedtoreadtheDOM

varbeforeRead='beforeRead';
varread='read';
varafterRead='afterRead';//pure-logicmodifiers

varbeforeMain='beforeMain';
varmain='main';
varafterMain='afterMain';//modifierwiththepurposetowritetotheDOM(orwriteintoaframeworkstate)

varbeforeWrite='beforeWrite';
varwrite='write';
varafterWrite='afterWrite';
varmodifierPhases=[beforeRead,read,afterRead,beforeMain,main,afterMain,beforeWrite,write,afterWrite];

functiongetNodeName(element){
returnelement?(element.nodeName||'').toLowerCase():null;
}

functiongetWindow(node){
if(node==null){
returnwindow;
}

if(node.toString()!=='[objectWindow]'){
varownerDocument=node.ownerDocument;
returnownerDocument?ownerDocument.defaultView||window:window;
}

returnnode;
}

functionisElement(node){
varOwnElement=getWindow(node).Element;
returnnodeinstanceofOwnElement||nodeinstanceofElement;
}

functionisHTMLElement(node){
varOwnElement=getWindow(node).HTMLElement;
returnnodeinstanceofOwnElement||nodeinstanceofHTMLElement;
}

functionisShadowRoot(node){
//IE11hasnoShadowRoot
if(typeofShadowRoot==='undefined'){
returnfalse;
}

varOwnElement=getWindow(node).ShadowRoot;
returnnodeinstanceofOwnElement||nodeinstanceofShadowRoot;
}

//andappliesthemtotheHTMLElementssuchaspopperandarrow

functionapplyStyles(_ref){
varstate=_ref.state;
Object.keys(state.elements).forEach(function(name){
varstyle=state.styles[name]||{};
varattributes=state.attributes[name]||{};
varelement=state.elements[name];//arrowisoptional+virtualelements

if(!isHTMLElement(element)||!getNodeName(element)){
return;
}//Flowdoesn'tsupporttoextendthisproperty,butit'sthemost
//effectivewaytoapplystylestoanHTMLElement
//$FlowFixMe[cannot-write]


Object.assign(element.style,style);
Object.keys(attributes).forEach(function(name){
varvalue=attributes[name];

if(value===false){
element.removeAttribute(name);
}else{
element.setAttribute(name,value===true?'':value);
}
});
});
}

functioneffect$2(_ref2){
varstate=_ref2.state;
varinitialStyles={
popper:{
position:state.options.strategy,
left:'0',
top:'0',
margin:'0'
},
arrow:{
position:'absolute'
},
reference:{}
};
Object.assign(state.elements.popper.style,initialStyles.popper);
state.styles=initialStyles;

if(state.elements.arrow){
Object.assign(state.elements.arrow.style,initialStyles.arrow);
}

returnfunction(){
Object.keys(state.elements).forEach(function(name){
varelement=state.elements[name];
varattributes=state.attributes[name]||{};
varstyleProperties=Object.keys(state.styles.hasOwnProperty(name)?state.styles[name]:initialStyles[name]);//Setallvaluestoanemptystringtounsetthem

varstyle=styleProperties.reduce(function(style,property){
style[property]='';
returnstyle;
},{});//arrowisoptional+virtualelements

if(!isHTMLElement(element)||!getNodeName(element)){
return;
}

Object.assign(element.style,style);
Object.keys(attributes).forEach(function(attribute){
element.removeAttribute(attribute);
});
});
};
}//eslint-disable-next-lineimport/no-unused-modules


varapplyStyles$1={
name:'applyStyles',
enabled:true,
phase:'write',
fn:applyStyles,
effect:effect$2,
requires:['computeStyles']
};

functiongetBasePlacement(placement){
returnplacement.split('-')[0];
}

varround$1=Math.round;
functiongetBoundingClientRect(element,includeScale){
if(includeScale===void0){
includeScale=false;
}

varrect=element.getBoundingClientRect();
varscaleX=1;
varscaleY=1;

if(isHTMLElement(element)&&includeScale){
//Fallbackto1incasebothvaluesare`0`
scaleX=rect.width/element.offsetWidth||1;
scaleY=rect.height/element.offsetHeight||1;
}

return{
width:round$1(rect.width/scaleX),
height:round$1(rect.height/scaleY),
top:round$1(rect.top/scaleY),
right:round$1(rect.right/scaleX),
bottom:round$1(rect.bottom/scaleY),
left:round$1(rect.left/scaleX),
x:round$1(rect.left/scaleX),
y:round$1(rect.top/scaleY)
};
}

//meansitdoesn'ttakeintoaccounttransforms.

functiongetLayoutRect(element){
varclientRect=getBoundingClientRect(element);//UsetheclientRectsizesifit'snotbeentransformed.
//Fixeshttps://github.com/popperjs/popper-core/issues/1223

varwidth=element.offsetWidth;
varheight=element.offsetHeight;

if(Math.abs(clientRect.width-width)<=1){
width=clientRect.width;
}

if(Math.abs(clientRect.height-height)<=1){
height=clientRect.height;
}

return{
x:element.offsetLeft,
y:element.offsetTop,
width:width,
height:height
};
}

functioncontains(parent,child){
varrootNode=child.getRootNode&&child.getRootNode();//First,attemptwithfasternativemethod

if(parent.contains(child)){
returntrue;
}//thenfallbacktocustomimplementationwithShadowDOMsupport
elseif(rootNode&&isShadowRoot(rootNode)){
varnext=child;

do{
if(next&&parent.isSameNode(next)){
returntrue;
}//$FlowFixMe[prop-missing]:needabetterwaytohandlethis...


next=next.parentNode||next.host;
}while(next);
}//Giveup,theresultisfalse


returnfalse;
}

functiongetComputedStyle$1(element){
returngetWindow(element).getComputedStyle(element);
}

functionisTableElement(element){
return['table','td','th'].indexOf(getNodeName(element))>=0;
}

functiongetDocumentElement(element){
//$FlowFixMe[incompatible-return]:assumebodyisalwaysavailable
return((isElement(element)?element.ownerDocument://$FlowFixMe[prop-missing]
element.document)||window.document).documentElement;
}

functiongetParentNode(element){
if(getNodeName(element)==='html'){
returnelement;
}

return(//thisisaquicker(butlesstypesafe)waytosavequitesomebytesfromthebundle
//$FlowFixMe[incompatible-return]
//$FlowFixMe[prop-missing]
element.assignedSlot||//stepintotheshadowDOMoftheparentofaslottednode
element.parentNode||(//DOMElementdetected
isShadowRoot(element)?element.host:null)||//ShadowRootdetected
//$FlowFixMe[incompatible-call]:HTMLElementisaNode
getDocumentElement(element)//fallback

);
}

functiongetTrueOffsetParent(element){
if(!isHTMLElement(element)||//https://github.com/popperjs/popper-core/issues/837
getComputedStyle$1(element).position==='fixed'){
returnnull;
}

returnelement.offsetParent;
}//`.offsetParent`reports`null`forfixedelements,whileabsoluteelements
//returnthecontainingblock


functiongetContainingBlock(element){
varisFirefox=navigator.userAgent.toLowerCase().indexOf('firefox')!==-1;
varisIE=navigator.userAgent.indexOf('Trident')!==-1;

if(isIE&&isHTMLElement(element)){
//InIE9,10and11fixedelementscontainingblockisalwaysestablishedbytheviewport
varelementCss=getComputedStyle$1(element);

if(elementCss.position==='fixed'){
returnnull;
}
}

varcurrentNode=getParentNode(element);

while(isHTMLElement(currentNode)&&['html','body'].indexOf(getNodeName(currentNode))<0){
varcss=getComputedStyle$1(currentNode);//Thisisnon-exhaustivebutcoversthemostcommonCSSpropertiesthat
//createacontainingblock.
//https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

if(css.transform!=='none'||css.perspective!=='none'||css.contain==='paint'||['transform','perspective'].indexOf(css.willChange)!==-1||isFirefox&&css.willChange==='filter'||isFirefox&&css.filter&&css.filter!=='none'){
returncurrentNode;
}else{
currentNode=currentNode.parentNode;
}
}

returnnull;
}//Getstheclosestancestorpositionedelement.Handlessomeedgecases,
//suchastableancestorsandcrossbrowserbugs.


functiongetOffsetParent(element){
varwindow=getWindow(element);
varoffsetParent=getTrueOffsetParent(element);

while(offsetParent&&isTableElement(offsetParent)&&getComputedStyle$1(offsetParent).position==='static'){
offsetParent=getTrueOffsetParent(offsetParent);
}

if(offsetParent&&(getNodeName(offsetParent)==='html'||getNodeName(offsetParent)==='body'&&getComputedStyle$1(offsetParent).position==='static')){
returnwindow;
}

returnoffsetParent||getContainingBlock(element)||window;
}

functiongetMainAxisFromPlacement(placement){
return['top','bottom'].indexOf(placement)>=0?'x':'y';
}

varmax=Math.max;
varmin=Math.min;
varround=Math.round;

functionwithin(min$1,value,max$1){
returnmax(min$1,min(value,max$1));
}

functiongetFreshSideObject(){
return{
top:0,
right:0,
bottom:0,
left:0
};
}

functionmergePaddingObject(paddingObject){
returnObject.assign({},getFreshSideObject(),paddingObject);
}

functionexpandToHashMap(value,keys){
returnkeys.reduce(function(hashMap,key){
hashMap[key]=value;
returnhashMap;
},{});
}

vartoPaddingObject=functiontoPaddingObject(padding,state){
padding=typeofpadding==='function'?padding(Object.assign({},state.rects,{
placement:state.placement
})):padding;
returnmergePaddingObject(typeofpadding!=='number'?padding:expandToHashMap(padding,basePlacements));
};

functionarrow(_ref){
var_state$modifiersData$;

varstate=_ref.state,
name=_ref.name,
options=_ref.options;
vararrowElement=state.elements.arrow;
varpopperOffsets=state.modifiersData.popperOffsets;
varbasePlacement=getBasePlacement(state.placement);
varaxis=getMainAxisFromPlacement(basePlacement);
varisVertical=[left,right].indexOf(basePlacement)>=0;
varlen=isVertical?'height':'width';

if(!arrowElement||!popperOffsets){
return;
}

varpaddingObject=toPaddingObject(options.padding,state);
vararrowRect=getLayoutRect(arrowElement);
varminProp=axis==='y'?top:left;
varmaxProp=axis==='y'?bottom:right;
varendDiff=state.rects.reference[len]+state.rects.reference[axis]-popperOffsets[axis]-state.rects.popper[len];
varstartDiff=popperOffsets[axis]-state.rects.reference[axis];
vararrowOffsetParent=getOffsetParent(arrowElement);
varclientSize=arrowOffsetParent?axis==='y'?arrowOffsetParent.clientHeight||0:arrowOffsetParent.clientWidth||0:0;
varcenterToReference=endDiff/2-startDiff/2;//Makesurethearrowdoesn'toverflowthepopperifthecenterpointis
//outsideofthepopperbounds

varmin=paddingObject[minProp];
varmax=clientSize-arrowRect[len]-paddingObject[maxProp];
varcenter=clientSize/2-arrowRect[len]/2+centerToReference;
varoffset=within(min,center,max);//Preventsbreakingsyntaxhighlighting...

varaxisProp=axis;
state.modifiersData[name]=(_state$modifiersData$={},_state$modifiersData$[axisProp]=offset,_state$modifiersData$.centerOffset=offset-center,_state$modifiersData$);
}

functioneffect$1(_ref2){
varstate=_ref2.state,
options=_ref2.options;
var_options$element=options.element,
arrowElement=_options$element===void0?'[data-popper-arrow]':_options$element;

if(arrowElement==null){
return;
}//CSSselector


if(typeofarrowElement==='string'){
arrowElement=state.elements.popper.querySelector(arrowElement);

if(!arrowElement){
return;
}
}

if(!contains(state.elements.popper,arrowElement)){

return;
}

state.elements.arrow=arrowElement;
}//eslint-disable-next-lineimport/no-unused-modules


vararrow$1={
name:'arrow',
enabled:true,
phase:'main',
fn:arrow,
effect:effect$1,
requires:['popperOffsets'],
requiresIfExists:['preventOverflow']
};

varunsetSides={
top:'auto',
right:'auto',
bottom:'auto',
left:'auto'
};//RoundtheoffsetstothenearestsuitablesubpixelbasedontheDPR.
//ZoomingcanchangetheDPR,butitseemstoreportavaluethatwill
//cleanlydividethevaluesintotheappropriatesubpixels.

functionroundOffsetsByDPR(_ref){
varx=_ref.x,
y=_ref.y;
varwin=window;
vardpr=win.devicePixelRatio||1;
return{
x:round(round(x*dpr)/dpr)||0,
y:round(round(y*dpr)/dpr)||0
};
}

functionmapToStyles(_ref2){
var_Object$assign2;

varpopper=_ref2.popper,
popperRect=_ref2.popperRect,
placement=_ref2.placement,
offsets=_ref2.offsets,
position=_ref2.position,
gpuAcceleration=_ref2.gpuAcceleration,
adaptive=_ref2.adaptive,
roundOffsets=_ref2.roundOffsets;

var_ref3=roundOffsets===true?roundOffsetsByDPR(offsets):typeofroundOffsets==='function'?roundOffsets(offsets):offsets,
_ref3$x=_ref3.x,
x=_ref3$x===void0?0:_ref3$x,
_ref3$y=_ref3.y,
y=_ref3$y===void0?0:_ref3$y;

varhasX=offsets.hasOwnProperty('x');
varhasY=offsets.hasOwnProperty('y');
varsideX=left;
varsideY=top;
varwin=window;

if(adaptive){
varoffsetParent=getOffsetParent(popper);
varheightProp='clientHeight';
varwidthProp='clientWidth';

if(offsetParent===getWindow(popper)){
offsetParent=getDocumentElement(popper);

if(getComputedStyle$1(offsetParent).position!=='static'){
heightProp='scrollHeight';
widthProp='scrollWidth';
}
}//$FlowFixMe[incompatible-cast]:forcetyperefinement,wecompareoffsetParentwithwindowabove,butFlowdoesn'tdetectit


offsetParent=offsetParent;

if(placement===top){
sideY=bottom;//$FlowFixMe[prop-missing]

y-=offsetParent[heightProp]-popperRect.height;
y*=gpuAcceleration?1:-1;
}

if(placement===left){
sideX=right;//$FlowFixMe[prop-missing]

x-=offsetParent[widthProp]-popperRect.width;
x*=gpuAcceleration?1:-1;
}
}

varcommonStyles=Object.assign({
position:position
},adaptive&&unsetSides);

if(gpuAcceleration){
var_Object$assign;

returnObject.assign({},commonStyles,(_Object$assign={},_Object$assign[sideY]=hasY?'0':'',_Object$assign[sideX]=hasX?'0':'',_Object$assign.transform=(win.devicePixelRatio||1)<2?"translate("+x+"px,"+y+"px)":"translate3d("+x+"px,"+y+"px,0)",_Object$assign));
}

returnObject.assign({},commonStyles,(_Object$assign2={},_Object$assign2[sideY]=hasY?y+"px":'',_Object$assign2[sideX]=hasX?x+"px":'',_Object$assign2.transform='',_Object$assign2));
}

functioncomputeStyles(_ref4){
varstate=_ref4.state,
options=_ref4.options;
var_options$gpuAccelerat=options.gpuAcceleration,
gpuAcceleration=_options$gpuAccelerat===void0?true:_options$gpuAccelerat,
_options$adaptive=options.adaptive,
adaptive=_options$adaptive===void0?true:_options$adaptive,
_options$roundOffsets=options.roundOffsets,
roundOffsets=_options$roundOffsets===void0?true:_options$roundOffsets;

varcommonStyles={
placement:getBasePlacement(state.placement),
popper:state.elements.popper,
popperRect:state.rects.popper,
gpuAcceleration:gpuAcceleration
};

if(state.modifiersData.popperOffsets!=null){
state.styles.popper=Object.assign({},state.styles.popper,mapToStyles(Object.assign({},commonStyles,{
offsets:state.modifiersData.popperOffsets,
position:state.options.strategy,
adaptive:adaptive,
roundOffsets:roundOffsets
})));
}

if(state.modifiersData.arrow!=null){
state.styles.arrow=Object.assign({},state.styles.arrow,mapToStyles(Object.assign({},commonStyles,{
offsets:state.modifiersData.arrow,
position:'absolute',
adaptive:false,
roundOffsets:roundOffsets
})));
}

state.attributes.popper=Object.assign({},state.attributes.popper,{
'data-popper-placement':state.placement
});
}//eslint-disable-next-lineimport/no-unused-modules


varcomputeStyles$1={
name:'computeStyles',
enabled:true,
phase:'beforeWrite',
fn:computeStyles,
data:{}
};

varpassive={
passive:true
};

functioneffect(_ref){
varstate=_ref.state,
instance=_ref.instance,
options=_ref.options;
var_options$scroll=options.scroll,
scroll=_options$scroll===void0?true:_options$scroll,
_options$resize=options.resize,
resize=_options$resize===void0?true:_options$resize;
varwindow=getWindow(state.elements.popper);
varscrollParents=[].concat(state.scrollParents.reference,state.scrollParents.popper);

if(scroll){
scrollParents.forEach(function(scrollParent){
scrollParent.addEventListener('scroll',instance.update,passive);
});
}

if(resize){
window.addEventListener('resize',instance.update,passive);
}

returnfunction(){
if(scroll){
scrollParents.forEach(function(scrollParent){
scrollParent.removeEventListener('scroll',instance.update,passive);
});
}

if(resize){
window.removeEventListener('resize',instance.update,passive);
}
};
}//eslint-disable-next-lineimport/no-unused-modules


vareventListeners={
name:'eventListeners',
enabled:true,
phase:'write',
fn:functionfn(){},
effect:effect,
data:{}
};

varhash$1={
left:'right',
right:'left',
bottom:'top',
top:'bottom'
};
functiongetOppositePlacement(placement){
returnplacement.replace(/left|right|bottom|top/g,function(matched){
returnhash$1[matched];
});
}

varhash={
start:'end',
end:'start'
};
functiongetOppositeVariationPlacement(placement){
returnplacement.replace(/start|end/g,function(matched){
returnhash[matched];
});
}

functiongetWindowScroll(node){
varwin=getWindow(node);
varscrollLeft=win.pageXOffset;
varscrollTop=win.pageYOffset;
return{
scrollLeft:scrollLeft,
scrollTop:scrollTop
};
}

functiongetWindowScrollBarX(element){
//If<html>hasaCSSwidthgreaterthantheviewport,thenthiswillbe
//incorrectforRTL.
//Popper1isbrokeninthiscaseandneverhadabugreportsolet'sassume
//it'snotanissue.Idon'tthinkanyoneeverspecifieswidthon<html>
//anyway.
//Browserswheretheleftscrollbardoesn'tcauseanissuereport`0`for
//this(e.g.Edge2019,IE11,Safari)
returngetBoundingClientRect(getDocumentElement(element)).left+getWindowScroll(element).scrollLeft;
}

functiongetViewportRect(element){
varwin=getWindow(element);
varhtml=getDocumentElement(element);
varvisualViewport=win.visualViewport;
varwidth=html.clientWidth;
varheight=html.clientHeight;
varx=0;
vary=0;//NB:Thisisn'tsupportedoniOS<=12.Ifthekeyboardisopen,thepopper
//canbeobscuredunderneathit.
//Also,`html.clientHeight`addsthebottombarheightinSafariiOS,even
//ifitisn'topen,soifthisisn'tavailable,thepopperwillbedetected
//tooverflowthebottomofthescreentooearly.

if(visualViewport){
width=visualViewport.width;
height=visualViewport.height;//UsesLayoutViewport(likeChrome;Safaridoesnotcurrently)
//InChrome,itreturnsavalueverycloseto0(+/-)butcontainsrounding
//errorsduetofloatingpointnumbers,soweneedtocheckprecision.
//Safarireturnsanumber<=0,usually<-1whenpinch-zoomed
//FeaturedetectionfailsinmobileemulationmodeinChrome.
//Math.abs(win.innerWidth/visualViewport.scale-visualViewport.width)<
//0.001
//Fallbackhere:"NotSafari"userAgent

if(!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
x=visualViewport.offsetLeft;
y=visualViewport.offsetTop;
}
}

return{
width:width,
height:height,
x:x+getWindowScrollBarX(element),
y:y
};
}

//ofthe`<html>`and`<body>`rectboundsifhorizontallyscrollable

functiongetDocumentRect(element){
var_element$ownerDocumen;

varhtml=getDocumentElement(element);
varwinScroll=getWindowScroll(element);
varbody=(_element$ownerDocumen=element.ownerDocument)==null?void0:_element$ownerDocumen.body;
varwidth=max(html.scrollWidth,html.clientWidth,body?body.scrollWidth:0,body?body.clientWidth:0);
varheight=max(html.scrollHeight,html.clientHeight,body?body.scrollHeight:0,body?body.clientHeight:0);
varx=-winScroll.scrollLeft+getWindowScrollBarX(element);
vary=-winScroll.scrollTop;

if(getComputedStyle$1(body||html).direction==='rtl'){
x+=max(html.clientWidth,body?body.clientWidth:0)-width;
}

return{
width:width,
height:height,
x:x,
y:y
};
}

functionisScrollParent(element){
//Firefoxwantsustocheck`-x`and`-y`variationsaswell
var_getComputedStyle=getComputedStyle$1(element),
overflow=_getComputedStyle.overflow,
overflowX=_getComputedStyle.overflowX,
overflowY=_getComputedStyle.overflowY;

return/auto|scroll|overlay|hidden/.test(overflow+overflowY+overflowX);
}

functiongetScrollParent(node){
if(['html','body','#document'].indexOf(getNodeName(node))>=0){
//$FlowFixMe[incompatible-return]:assumebodyisalwaysavailable
returnnode.ownerDocument.body;
}

if(isHTMLElement(node)&&isScrollParent(node)){
returnnode;
}

returngetScrollParent(getParentNode(node));
}

/*
givenaDOMelement,returnthelistofallscrollparents,upthelistofancesors
untilwegettothetopwindowobject.Thislistiswhatweattachscrolllisteners
to,becauseifanyoftheseparentelementsscroll,we'llneedtore-calculatethe
referenceelement'sposition.
*/

functionlistScrollParents(element,list){
var_element$ownerDocumen;

if(list===void0){
list=[];
}

varscrollParent=getScrollParent(element);
varisBody=scrollParent===((_element$ownerDocumen=element.ownerDocument)==null?void0:_element$ownerDocumen.body);
varwin=getWindow(scrollParent);
vartarget=isBody?[win].concat(win.visualViewport||[],isScrollParent(scrollParent)?scrollParent:[]):scrollParent;
varupdatedList=list.concat(target);
returnisBody?updatedList://$FlowFixMe[incompatible-call]:isBodytellsustargetwillbeanHTMLElementhere
updatedList.concat(listScrollParents(getParentNode(target)));
}

functionrectToClientRect(rect){
returnObject.assign({},rect,{
left:rect.x,
top:rect.y,
right:rect.x+rect.width,
bottom:rect.y+rect.height
});
}

functiongetInnerBoundingClientRect(element){
varrect=getBoundingClientRect(element);
rect.top=rect.top+element.clientTop;
rect.left=rect.left+element.clientLeft;
rect.bottom=rect.top+element.clientHeight;
rect.right=rect.left+element.clientWidth;
rect.width=element.clientWidth;
rect.height=element.clientHeight;
rect.x=rect.left;
rect.y=rect.top;
returnrect;
}

functiongetClientRectFromMixedType(element,clippingParent){
returnclippingParent===viewport?rectToClientRect(getViewportRect(element)):isHTMLElement(clippingParent)?getInnerBoundingClientRect(clippingParent):rectToClientRect(getDocumentRect(getDocumentElement(element)));
}//A"clippingparent"isanoverflowablecontainerwiththecharacteristicof
//clipping(orhiding)overflowingelementswithapositiondifferentfrom
//`initial`


functiongetClippingParents(element){
varclippingParents=listScrollParents(getParentNode(element));
varcanEscapeClipping=['absolute','fixed'].indexOf(getComputedStyle$1(element).position)>=0;
varclipperElement=canEscapeClipping&&isHTMLElement(element)?getOffsetParent(element):element;

if(!isElement(clipperElement)){
return[];
}//$FlowFixMe[incompatible-return]:https://github.com/facebook/flow/issues/1414


returnclippingParents.filter(function(clippingParent){
returnisElement(clippingParent)&&contains(clippingParent,clipperElement)&&getNodeName(clippingParent)!=='body';
});
}//Getsthemaximumareathattheelementisvisibleinduetoanynumberof
//clippingparents


functiongetClippingRect(element,boundary,rootBoundary){
varmainClippingParents=boundary==='clippingParents'?getClippingParents(element):[].concat(boundary);
varclippingParents=[].concat(mainClippingParents,[rootBoundary]);
varfirstClippingParent=clippingParents[0];
varclippingRect=clippingParents.reduce(function(accRect,clippingParent){
varrect=getClientRectFromMixedType(element,clippingParent);
accRect.top=max(rect.top,accRect.top);
accRect.right=min(rect.right,accRect.right);
accRect.bottom=min(rect.bottom,accRect.bottom);
accRect.left=max(rect.left,accRect.left);
returnaccRect;
},getClientRectFromMixedType(element,firstClippingParent));
clippingRect.width=clippingRect.right-clippingRect.left;
clippingRect.height=clippingRect.bottom-clippingRect.top;
clippingRect.x=clippingRect.left;
clippingRect.y=clippingRect.top;
returnclippingRect;
}

functiongetVariation(placement){
returnplacement.split('-')[1];
}

functioncomputeOffsets(_ref){
varreference=_ref.reference,
element=_ref.element,
placement=_ref.placement;
varbasePlacement=placement?getBasePlacement(placement):null;
varvariation=placement?getVariation(placement):null;
varcommonX=reference.x+reference.width/2-element.width/2;
varcommonY=reference.y+reference.height/2-element.height/2;
varoffsets;

switch(basePlacement){
casetop:
offsets={
x:commonX,
y:reference.y-element.height
};
break;

casebottom:
offsets={
x:commonX,
y:reference.y+reference.height
};
break;

caseright:
offsets={
x:reference.x+reference.width,
y:commonY
};
break;

caseleft:
offsets={
x:reference.x-element.width,
y:commonY
};
break;

default:
offsets={
x:reference.x,
y:reference.y
};
}

varmainAxis=basePlacement?getMainAxisFromPlacement(basePlacement):null;

if(mainAxis!=null){
varlen=mainAxis==='y'?'height':'width';

switch(variation){
casestart:
offsets[mainAxis]=offsets[mainAxis]-(reference[len]/2-element[len]/2);
break;

caseend:
offsets[mainAxis]=offsets[mainAxis]+(reference[len]/2-element[len]/2);
break;
}
}

returnoffsets;
}

functiondetectOverflow(state,options){
if(options===void0){
options={};
}

var_options=options,
_options$placement=_options.placement,
placement=_options$placement===void0?state.placement:_options$placement,
_options$boundary=_options.boundary,
boundary=_options$boundary===void0?clippingParents:_options$boundary,
_options$rootBoundary=_options.rootBoundary,
rootBoundary=_options$rootBoundary===void0?viewport:_options$rootBoundary,
_options$elementConte=_options.elementContext,
elementContext=_options$elementConte===void0?popper:_options$elementConte,
_options$altBoundary=_options.altBoundary,
altBoundary=_options$altBoundary===void0?false:_options$altBoundary,
_options$padding=_options.padding,
padding=_options$padding===void0?0:_options$padding;
varpaddingObject=mergePaddingObject(typeofpadding!=='number'?padding:expandToHashMap(padding,basePlacements));
varaltContext=elementContext===popper?reference:popper;
varreferenceElement=state.elements.reference;
varpopperRect=state.rects.popper;
varelement=state.elements[altBoundary?altContext:elementContext];
varclippingClientRect=getClippingRect(isElement(element)?element:element.contextElement||getDocumentElement(state.elements.popper),boundary,rootBoundary);
varreferenceClientRect=getBoundingClientRect(referenceElement);
varpopperOffsets=computeOffsets({
reference:referenceClientRect,
element:popperRect,
strategy:'absolute',
placement:placement
});
varpopperClientRect=rectToClientRect(Object.assign({},popperRect,popperOffsets));
varelementClientRect=elementContext===popper?popperClientRect:referenceClientRect;//positive=overflowingtheclippingrect
//0ornegative=withintheclippingrect

varoverflowOffsets={
top:clippingClientRect.top-elementClientRect.top+paddingObject.top,
bottom:elementClientRect.bottom-clippingClientRect.bottom+paddingObject.bottom,
left:clippingClientRect.left-elementClientRect.left+paddingObject.left,
right:elementClientRect.right-clippingClientRect.right+paddingObject.right
};
varoffsetData=state.modifiersData.offset;//Offsetscanbeappliedonlytothepopperelement

if(elementContext===popper&&offsetData){
varoffset=offsetData[placement];
Object.keys(overflowOffsets).forEach(function(key){
varmultiply=[right,bottom].indexOf(key)>=0?1:-1;
varaxis=[top,bottom].indexOf(key)>=0?'y':'x';
overflowOffsets[key]+=offset[axis]*multiply;
});
}

returnoverflowOffsets;
}

functioncomputeAutoPlacement(state,options){
if(options===void0){
options={};
}

var_options=options,
placement=_options.placement,
boundary=_options.boundary,
rootBoundary=_options.rootBoundary,
padding=_options.padding,
flipVariations=_options.flipVariations,
_options$allowedAutoP=_options.allowedAutoPlacements,
allowedAutoPlacements=_options$allowedAutoP===void0?placements:_options$allowedAutoP;
varvariation=getVariation(placement);
varplacements$1=variation?flipVariations?variationPlacements:variationPlacements.filter(function(placement){
returngetVariation(placement)===variation;
}):basePlacements;
varallowedPlacements=placements$1.filter(function(placement){
returnallowedAutoPlacements.indexOf(placement)>=0;
});

if(allowedPlacements.length===0){
allowedPlacements=placements$1;
}//$FlowFixMe[incompatible-type]:Flowseemstohaveproblemswithtwoarrayunions...


varoverflows=allowedPlacements.reduce(function(acc,placement){
acc[placement]=detectOverflow(state,{
placement:placement,
boundary:boundary,
rootBoundary:rootBoundary,
padding:padding
})[getBasePlacement(placement)];
returnacc;
},{});
returnObject.keys(overflows).sort(function(a,b){
returnoverflows[a]-overflows[b];
});
}

functiongetExpandedFallbackPlacements(placement){
if(getBasePlacement(placement)===auto){
return[];
}

varoppositePlacement=getOppositePlacement(placement);
return[getOppositeVariationPlacement(placement),oppositePlacement,getOppositeVariationPlacement(oppositePlacement)];
}

functionflip(_ref){
varstate=_ref.state,
options=_ref.options,
name=_ref.name;

if(state.modifiersData[name]._skip){
return;
}

var_options$mainAxis=options.mainAxis,
checkMainAxis=_options$mainAxis===void0?true:_options$mainAxis,
_options$altAxis=options.altAxis,
checkAltAxis=_options$altAxis===void0?true:_options$altAxis,
specifiedFallbackPlacements=options.fallbackPlacements,
padding=options.padding,
boundary=options.boundary,
rootBoundary=options.rootBoundary,
altBoundary=options.altBoundary,
_options$flipVariatio=options.flipVariations,
flipVariations=_options$flipVariatio===void0?true:_options$flipVariatio,
allowedAutoPlacements=options.allowedAutoPlacements;
varpreferredPlacement=state.options.placement;
varbasePlacement=getBasePlacement(preferredPlacement);
varisBasePlacement=basePlacement===preferredPlacement;
varfallbackPlacements=specifiedFallbackPlacements||(isBasePlacement||!flipVariations?[getOppositePlacement(preferredPlacement)]:getExpandedFallbackPlacements(preferredPlacement));
varplacements=[preferredPlacement].concat(fallbackPlacements).reduce(function(acc,placement){
returnacc.concat(getBasePlacement(placement)===auto?computeAutoPlacement(state,{
placement:placement,
boundary:boundary,
rootBoundary:rootBoundary,
padding:padding,
flipVariations:flipVariations,
allowedAutoPlacements:allowedAutoPlacements
}):placement);
},[]);
varreferenceRect=state.rects.reference;
varpopperRect=state.rects.popper;
varchecksMap=newMap();
varmakeFallbackChecks=true;
varfirstFittingPlacement=placements[0];

for(vari=0;i<placements.length;i++){
varplacement=placements[i];

var_basePlacement=getBasePlacement(placement);

varisStartVariation=getVariation(placement)===start;
varisVertical=[top,bottom].indexOf(_basePlacement)>=0;
varlen=isVertical?'width':'height';
varoverflow=detectOverflow(state,{
placement:placement,
boundary:boundary,
rootBoundary:rootBoundary,
altBoundary:altBoundary,
padding:padding
});
varmainVariationSide=isVertical?isStartVariation?right:left:isStartVariation?bottom:top;

if(referenceRect[len]>popperRect[len]){
mainVariationSide=getOppositePlacement(mainVariationSide);
}

varaltVariationSide=getOppositePlacement(mainVariationSide);
varchecks=[];

if(checkMainAxis){
checks.push(overflow[_basePlacement]<=0);
}

if(checkAltAxis){
checks.push(overflow[mainVariationSide]<=0,overflow[altVariationSide]<=0);
}

if(checks.every(function(check){
returncheck;
})){
firstFittingPlacement=placement;
makeFallbackChecks=false;
break;
}

checksMap.set(placement,checks);
}

if(makeFallbackChecks){
//`2`maybedesiredinsomecases–researchlater
varnumberOfChecks=flipVariations?3:1;

var_loop=function_loop(_i){
varfittingPlacement=placements.find(function(placement){
varchecks=checksMap.get(placement);

if(checks){
returnchecks.slice(0,_i).every(function(check){
returncheck;
});
}
});

if(fittingPlacement){
firstFittingPlacement=fittingPlacement;
return"break";
}
};

for(var_i=numberOfChecks;_i>0;_i--){
var_ret=_loop(_i);

if(_ret==="break")break;
}
}

if(state.placement!==firstFittingPlacement){
state.modifiersData[name]._skip=true;
state.placement=firstFittingPlacement;
state.reset=true;
}
}//eslint-disable-next-lineimport/no-unused-modules


varflip$1={
name:'flip',
enabled:true,
phase:'main',
fn:flip,
requiresIfExists:['offset'],
data:{
_skip:false
}
};

functiongetSideOffsets(overflow,rect,preventedOffsets){
if(preventedOffsets===void0){
preventedOffsets={
x:0,
y:0
};
}

return{
top:overflow.top-rect.height-preventedOffsets.y,
right:overflow.right-rect.width+preventedOffsets.x,
bottom:overflow.bottom-rect.height+preventedOffsets.y,
left:overflow.left-rect.width-preventedOffsets.x
};
}

functionisAnySideFullyClipped(overflow){
return[top,right,bottom,left].some(function(side){
returnoverflow[side]>=0;
});
}

functionhide(_ref){
varstate=_ref.state,
name=_ref.name;
varreferenceRect=state.rects.reference;
varpopperRect=state.rects.popper;
varpreventedOffsets=state.modifiersData.preventOverflow;
varreferenceOverflow=detectOverflow(state,{
elementContext:'reference'
});
varpopperAltOverflow=detectOverflow(state,{
altBoundary:true
});
varreferenceClippingOffsets=getSideOffsets(referenceOverflow,referenceRect);
varpopperEscapeOffsets=getSideOffsets(popperAltOverflow,popperRect,preventedOffsets);
varisReferenceHidden=isAnySideFullyClipped(referenceClippingOffsets);
varhasPopperEscaped=isAnySideFullyClipped(popperEscapeOffsets);
state.modifiersData[name]={
referenceClippingOffsets:referenceClippingOffsets,
popperEscapeOffsets:popperEscapeOffsets,
isReferenceHidden:isReferenceHidden,
hasPopperEscaped:hasPopperEscaped
};
state.attributes.popper=Object.assign({},state.attributes.popper,{
'data-popper-reference-hidden':isReferenceHidden,
'data-popper-escaped':hasPopperEscaped
});
}//eslint-disable-next-lineimport/no-unused-modules


varhide$1={
name:'hide',
enabled:true,
phase:'main',
requiresIfExists:['preventOverflow'],
fn:hide
};

functiondistanceAndSkiddingToXY(placement,rects,offset){
varbasePlacement=getBasePlacement(placement);
varinvertDistance=[left,top].indexOf(basePlacement)>=0?-1:1;

var_ref=typeofoffset==='function'?offset(Object.assign({},rects,{
placement:placement
})):offset,
skidding=_ref[0],
distance=_ref[1];

skidding=skidding||0;
distance=(distance||0)*invertDistance;
return[left,right].indexOf(basePlacement)>=0?{
x:distance,
y:skidding
}:{
x:skidding,
y:distance
};
}

functionoffset(_ref2){
varstate=_ref2.state,
options=_ref2.options,
name=_ref2.name;
var_options$offset=options.offset,
offset=_options$offset===void0?[0,0]:_options$offset;
vardata=placements.reduce(function(acc,placement){
acc[placement]=distanceAndSkiddingToXY(placement,state.rects,offset);
returnacc;
},{});
var_data$state$placement=data[state.placement],
x=_data$state$placement.x,
y=_data$state$placement.y;

if(state.modifiersData.popperOffsets!=null){
state.modifiersData.popperOffsets.x+=x;
state.modifiersData.popperOffsets.y+=y;
}

state.modifiersData[name]=data;
}//eslint-disable-next-lineimport/no-unused-modules


varoffset$1={
name:'offset',
enabled:true,
phase:'main',
requires:['popperOffsets'],
fn:offset
};

functionpopperOffsets(_ref){
varstate=_ref.state,
name=_ref.name;
//Offsetsaretheactualpositionthepopperneedstohavetobe
//properlypositionednearitsreferenceelement
//Thisisthemostbasicplacement,andwillbeadjustedby
//themodifiersinthenextstep
state.modifiersData[name]=computeOffsets({
reference:state.rects.reference,
element:state.rects.popper,
strategy:'absolute',
placement:state.placement
});
}//eslint-disable-next-lineimport/no-unused-modules


varpopperOffsets$1={
name:'popperOffsets',
enabled:true,
phase:'read',
fn:popperOffsets,
data:{}
};

functiongetAltAxis(axis){
returnaxis==='x'?'y':'x';
}

functionpreventOverflow(_ref){
varstate=_ref.state,
options=_ref.options,
name=_ref.name;
var_options$mainAxis=options.mainAxis,
checkMainAxis=_options$mainAxis===void0?true:_options$mainAxis,
_options$altAxis=options.altAxis,
checkAltAxis=_options$altAxis===void0?false:_options$altAxis,
boundary=options.boundary,
rootBoundary=options.rootBoundary,
altBoundary=options.altBoundary,
padding=options.padding,
_options$tether=options.tether,
tether=_options$tether===void0?true:_options$tether,
_options$tetherOffset=options.tetherOffset,
tetherOffset=_options$tetherOffset===void0?0:_options$tetherOffset;
varoverflow=detectOverflow(state,{
boundary:boundary,
rootBoundary:rootBoundary,
padding:padding,
altBoundary:altBoundary
});
varbasePlacement=getBasePlacement(state.placement);
varvariation=getVariation(state.placement);
varisBasePlacement=!variation;
varmainAxis=getMainAxisFromPlacement(basePlacement);
varaltAxis=getAltAxis(mainAxis);
varpopperOffsets=state.modifiersData.popperOffsets;
varreferenceRect=state.rects.reference;
varpopperRect=state.rects.popper;
vartetherOffsetValue=typeoftetherOffset==='function'?tetherOffset(Object.assign({},state.rects,{
placement:state.placement
})):tetherOffset;
vardata={
x:0,
y:0
};

if(!popperOffsets){
return;
}

if(checkMainAxis||checkAltAxis){
varmainSide=mainAxis==='y'?top:left;
varaltSide=mainAxis==='y'?bottom:right;
varlen=mainAxis==='y'?'height':'width';
varoffset=popperOffsets[mainAxis];
varmin$1=popperOffsets[mainAxis]+overflow[mainSide];
varmax$1=popperOffsets[mainAxis]-overflow[altSide];
varadditive=tether?-popperRect[len]/2:0;
varminLen=variation===start?referenceRect[len]:popperRect[len];
varmaxLen=variation===start?-popperRect[len]:-referenceRect[len];//Weneedtoincludethearrowinthecalculationsothearrowdoesn'tgo
//outsidethereferencebounds

vararrowElement=state.elements.arrow;
vararrowRect=tether&&arrowElement?getLayoutRect(arrowElement):{
width:0,
height:0
};
vararrowPaddingObject=state.modifiersData['arrow#persistent']?state.modifiersData['arrow#persistent'].padding:getFreshSideObject();
vararrowPaddingMin=arrowPaddingObject[mainSide];
vararrowPaddingMax=arrowPaddingObject[altSide];//Ifthereferencelengthissmallerthanthearrowlength,wedon'twant
//toincludeitsfullsizeinthecalculation.Ifthereferenceissmall
//andneartheedgeofaboundary,thepoppercanoverflowevenifthe
//referenceisnotoverflowingaswell(e.g.virtualelementswithno
//widthorheight)

vararrowLen=within(0,referenceRect[len],arrowRect[len]);
varminOffset=isBasePlacement?referenceRect[len]/2-additive-arrowLen-arrowPaddingMin-tetherOffsetValue:minLen-arrowLen-arrowPaddingMin-tetherOffsetValue;
varmaxOffset=isBasePlacement?-referenceRect[len]/2+additive+arrowLen+arrowPaddingMax+tetherOffsetValue:maxLen+arrowLen+arrowPaddingMax+tetherOffsetValue;
vararrowOffsetParent=state.elements.arrow&&getOffsetParent(state.elements.arrow);
varclientOffset=arrowOffsetParent?mainAxis==='y'?arrowOffsetParent.clientTop||0:arrowOffsetParent.clientLeft||0:0;
varoffsetModifierValue=state.modifiersData.offset?state.modifiersData.offset[state.placement][mainAxis]:0;
vartetherMin=popperOffsets[mainAxis]+minOffset-offsetModifierValue-clientOffset;
vartetherMax=popperOffsets[mainAxis]+maxOffset-offsetModifierValue;

if(checkMainAxis){
varpreventedOffset=within(tether?min(min$1,tetherMin):min$1,offset,tether?max(max$1,tetherMax):max$1);
popperOffsets[mainAxis]=preventedOffset;
data[mainAxis]=preventedOffset-offset;
}

if(checkAltAxis){
var_mainSide=mainAxis==='x'?top:left;

var_altSide=mainAxis==='x'?bottom:right;

var_offset=popperOffsets[altAxis];

var_min=_offset+overflow[_mainSide];

var_max=_offset-overflow[_altSide];

var_preventedOffset=within(tether?min(_min,tetherMin):_min,_offset,tether?max(_max,tetherMax):_max);

popperOffsets[altAxis]=_preventedOffset;
data[altAxis]=_preventedOffset-_offset;
}
}

state.modifiersData[name]=data;
}//eslint-disable-next-lineimport/no-unused-modules


varpreventOverflow$1={
name:'preventOverflow',
enabled:true,
phase:'main',
fn:preventOverflow,
requiresIfExists:['offset']
};

functiongetHTMLElementScroll(element){
return{
scrollLeft:element.scrollLeft,
scrollTop:element.scrollTop
};
}

functiongetNodeScroll(node){
if(node===getWindow(node)||!isHTMLElement(node)){
returngetWindowScroll(node);
}else{
returngetHTMLElementScroll(node);
}
}

functionisElementScaled(element){
varrect=element.getBoundingClientRect();
varscaleX=rect.width/element.offsetWidth||1;
varscaleY=rect.height/element.offsetHeight||1;
returnscaleX!==1||scaleY!==1;
}//ReturnsthecompositerectofanelementrelativetoitsoffsetParent.
//Compositemeansittakesintoaccounttransformsaswellaslayout.


functiongetCompositeRect(elementOrVirtualElement,offsetParent,isFixed){
if(isFixed===void0){
isFixed=false;
}

varisOffsetParentAnElement=isHTMLElement(offsetParent);
varoffsetParentIsScaled=isHTMLElement(offsetParent)&&isElementScaled(offsetParent);
vardocumentElement=getDocumentElement(offsetParent);
varrect=getBoundingClientRect(elementOrVirtualElement,offsetParentIsScaled);
varscroll={
scrollLeft:0,
scrollTop:0
};
varoffsets={
x:0,
y:0
};

if(isOffsetParentAnElement||!isOffsetParentAnElement&&!isFixed){
if(getNodeName(offsetParent)!=='body'||//https://github.com/popperjs/popper-core/issues/1078
isScrollParent(documentElement)){
scroll=getNodeScroll(offsetParent);
}

if(isHTMLElement(offsetParent)){
offsets=getBoundingClientRect(offsetParent,true);
offsets.x+=offsetParent.clientLeft;
offsets.y+=offsetParent.clientTop;
}elseif(documentElement){
offsets.x=getWindowScrollBarX(documentElement);
}
}

return{
x:rect.left+scroll.scrollLeft-offsets.x,
y:rect.top+scroll.scrollTop-offsets.y,
width:rect.width,
height:rect.height
};
}

functionorder(modifiers){
varmap=newMap();
varvisited=newSet();
varresult=[];
modifiers.forEach(function(modifier){
map.set(modifier.name,modifier);
});//Onvisitingobject,checkforitsdependenciesandvisitthemrecursively

functionsort(modifier){
visited.add(modifier.name);
varrequires=[].concat(modifier.requires||[],modifier.requiresIfExists||[]);
requires.forEach(function(dep){
if(!visited.has(dep)){
vardepModifier=map.get(dep);

if(depModifier){
sort(depModifier);
}
}
});
result.push(modifier);
}

modifiers.forEach(function(modifier){
if(!visited.has(modifier.name)){
//checkforvisitedobject
sort(modifier);
}
});
returnresult;
}

functionorderModifiers(modifiers){
//orderbasedondependencies
varorderedModifiers=order(modifiers);//orderbasedonphase

returnmodifierPhases.reduce(function(acc,phase){
returnacc.concat(orderedModifiers.filter(function(modifier){
returnmodifier.phase===phase;
}));
},[]);
}

functiondebounce(fn){
varpending;
returnfunction(){
if(!pending){
pending=newPromise(function(resolve){
Promise.resolve().then(function(){
pending=undefined;
resolve(fn());
});
});
}

returnpending;
};
}

functionmergeByName(modifiers){
varmerged=modifiers.reduce(function(merged,current){
varexisting=merged[current.name];
merged[current.name]=existing?Object.assign({},existing,current,{
options:Object.assign({},existing.options,current.options),
data:Object.assign({},existing.data,current.data)
}):current;
returnmerged;
},{});//IE11doesnotsupportObject.values

returnObject.keys(merged).map(function(key){
returnmerged[key];
});
}

varDEFAULT_OPTIONS={
placement:'bottom',
modifiers:[],
strategy:'absolute'
};

functionareValidElements(){
for(var_len=arguments.length,args=newArray(_len),_key=0;_key<_len;_key++){
args[_key]=arguments[_key];
}

return!args.some(function(element){
return!(element&&typeofelement.getBoundingClientRect==='function');
});
}

functionpopperGenerator(generatorOptions){
if(generatorOptions===void0){
generatorOptions={};
}

var_generatorOptions=generatorOptions,
_generatorOptions$def=_generatorOptions.defaultModifiers,
defaultModifiers=_generatorOptions$def===void0?[]:_generatorOptions$def,
_generatorOptions$def2=_generatorOptions.defaultOptions,
defaultOptions=_generatorOptions$def2===void0?DEFAULT_OPTIONS:_generatorOptions$def2;
returnfunctioncreatePopper(reference,popper,options){
if(options===void0){
options=defaultOptions;
}

varstate={
placement:'bottom',
orderedModifiers:[],
options:Object.assign({},DEFAULT_OPTIONS,defaultOptions),
modifiersData:{},
elements:{
reference:reference,
popper:popper
},
attributes:{},
styles:{}
};
vareffectCleanupFns=[];
varisDestroyed=false;
varinstance={
state:state,
setOptions:functionsetOptions(options){
cleanupModifierEffects();
state.options=Object.assign({},defaultOptions,state.options,options);
state.scrollParents={
reference:isElement(reference)?listScrollParents(reference):reference.contextElement?listScrollParents(reference.contextElement):[],
popper:listScrollParents(popper)
};//Ordersthemodifiersbasedontheirdependenciesand`phase`
//properties

varorderedModifiers=orderModifiers(mergeByName([].concat(defaultModifiers,state.options.modifiers)));//Stripoutdisabledmodifiers

state.orderedModifiers=orderedModifiers.filter(function(m){
returnm.enabled;
});//Validatetheprovidedmodifierssothattheconsumerwillgetwarned

runModifierEffects();
returninstance.update();
},
//Syncupdate–itwillalwaysbeexecuted,evenifnotnecessary.This
//isusefulforlowfrequencyupdateswheresyncbehaviorsimplifiesthe
//logic.
//Forhighfrequencyupdates(e.g.`resize`and`scroll`events),always
//prefertheasyncPopper#updatemethod
forceUpdate:functionforceUpdate(){
if(isDestroyed){
return;
}

var_state$elements=state.elements,
reference=_state$elements.reference,
popper=_state$elements.popper;//Don'tproceedif`reference`or`popper`arenotvalidelements
//anymore

if(!areValidElements(reference,popper)){

return;
}//Storethereferenceandpopperrectstobereadbymodifiers


state.rects={
reference:getCompositeRect(reference,getOffsetParent(popper),state.options.strategy==='fixed'),
popper:getLayoutRect(popper)
};//Modifiershavetheabilitytoresetthecurrentupdatecycle.The
//mostcommonusecaseforthisisthe`flip`modifierchangingthe
//placement,whichthenneedstore-runallthemodifiers,becausethe
//logicwaspreviouslyranforthepreviousplacementandistherefore
//stale/incorrect

state.reset=false;
state.placement=state.options.placement;//Oneachupdatecycle,the`modifiersData`propertyforeachmodifier
//isfilledwiththeinitialdataspecifiedbythemodifier.Thismeans
//itdoesn'tpersistandisfreshoneachupdate.
//Toensurepersistentdata,use`${name}#persistent`

state.orderedModifiers.forEach(function(modifier){
returnstate.modifiersData[modifier.name]=Object.assign({},modifier.data);
});

for(varindex=0;index<state.orderedModifiers.length;index++){

if(state.reset===true){
state.reset=false;
index=-1;
continue;
}

var_state$orderedModifie=state.orderedModifiers[index],
fn=_state$orderedModifie.fn,
_state$orderedModifie2=_state$orderedModifie.options,
_options=_state$orderedModifie2===void0?{}:_state$orderedModifie2,
name=_state$orderedModifie.name;

if(typeoffn==='function'){
state=fn({
state:state,
options:_options,
name:name,
instance:instance
})||state;
}
}
},
//Asyncandoptimisticallyoptimizedupdate–itwillnotbeexecutedif
//notnecessary(debouncedtorunatmostonce-per-tick)
update:debounce(function(){
returnnewPromise(function(resolve){
instance.forceUpdate();
resolve(state);
});
}),
destroy:functiondestroy(){
cleanupModifierEffects();
isDestroyed=true;
}
};

if(!areValidElements(reference,popper)){

returninstance;
}

instance.setOptions(options).then(function(state){
if(!isDestroyed&&options.onFirstUpdate){
options.onFirstUpdate(state);
}
});//Modifiershavetheabilitytoexecutearbitrarycodebeforethefirst
//updatecycleruns.Theywillbeexecutedinthesameorderastheupdate
//cycle.Thisisusefulwhenamodifieraddssomepersistentdatathat
//othermodifiersneedtouse,butthemodifierisrunafterthedependent
//one.

functionrunModifierEffects(){
state.orderedModifiers.forEach(function(_ref3){
varname=_ref3.name,
_ref3$options=_ref3.options,
options=_ref3$options===void0?{}:_ref3$options,
effect=_ref3.effect;

if(typeofeffect==='function'){
varcleanupFn=effect({
state:state,
name:name,
instance:instance,
options:options
});

varnoopFn=functionnoopFn(){};

effectCleanupFns.push(cleanupFn||noopFn);
}
});
}

functioncleanupModifierEffects(){
effectCleanupFns.forEach(function(fn){
returnfn();
});
effectCleanupFns=[];
}

returninstance;
};
}
varcreatePopper$2=/*#__PURE__*/popperGenerator();//eslint-disable-next-lineimport/no-unused-modules

vardefaultModifiers$1=[eventListeners,popperOffsets$1,computeStyles$1,applyStyles$1];
varcreatePopper$1=/*#__PURE__*/popperGenerator({
defaultModifiers:defaultModifiers$1
});//eslint-disable-next-lineimport/no-unused-modules

vardefaultModifiers=[eventListeners,popperOffsets$1,computeStyles$1,applyStyles$1,offset$1,flip$1,preventOverflow$1,arrow$1,hide$1];
varcreatePopper=/*#__PURE__*/popperGenerator({
defaultModifiers:defaultModifiers
});//eslint-disable-next-lineimport/no-unused-modules

varPopper=/*#__PURE__*/Object.freeze({
__proto__:null,
popperGenerator:popperGenerator,
detectOverflow:detectOverflow,
createPopperBase:createPopper$2,
createPopper:createPopper,
createPopperLite:createPopper$1,
top:top,
bottom:bottom,
right:right,
left:left,
auto:auto,
basePlacements:basePlacements,
start:start,
end:end,
clippingParents:clippingParents,
viewport:viewport,
popper:popper,
reference:reference,
variationPlacements:variationPlacements,
placements:placements,
beforeRead:beforeRead,
read:read,
afterRead:afterRead,
beforeMain:beforeMain,
main:main,
afterMain:afterMain,
beforeWrite:beforeWrite,
write:write,
afterWrite:afterWrite,
modifierPhases:modifierPhases,
applyStyles:applyStyles$1,
arrow:arrow$1,
computeStyles:computeStyles$1,
eventListeners:eventListeners,
flip:flip$1,
hide:hide$1,
offset:offset$1,
popperOffsets:popperOffsets$1,
preventOverflow:preventOverflow$1
});

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):dropdown.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$9='dropdown';
constDATA_KEY$8='bs.dropdown';
constEVENT_KEY$8=`.${DATA_KEY$8}`;
constDATA_API_KEY$4='.data-api';
constESCAPE_KEY$2='Escape';
constSPACE_KEY='Space';
constTAB_KEY$1='Tab';
constARROW_UP_KEY='ArrowUp';
constARROW_DOWN_KEY='ArrowDown';
constRIGHT_MOUSE_BUTTON=2;//MouseEvent.buttonvalueforthesecondarybutton,usuallytherightbutton

constREGEXP_KEYDOWN=newRegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
constEVENT_HIDE$4=`hide${EVENT_KEY$8}`;
constEVENT_HIDDEN$4=`hidden${EVENT_KEY$8}`;
constEVENT_SHOW$4=`show${EVENT_KEY$8}`;
constEVENT_SHOWN$4=`shown${EVENT_KEY$8}`;
constEVENT_CLICK_DATA_API$3=`click${EVENT_KEY$8}${DATA_API_KEY$4}`;
constEVENT_KEYDOWN_DATA_API=`keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
constEVENT_KEYUP_DATA_API=`keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
constCLASS_NAME_SHOW$6='show';
constCLASS_NAME_DROPUP='dropup';
constCLASS_NAME_DROPEND='dropend';
constCLASS_NAME_DROPSTART='dropstart';
constCLASS_NAME_NAVBAR='navbar';
constSELECTOR_DATA_TOGGLE$3='[data-bs-toggle="dropdown"]';
constSELECTOR_MENU='.dropdown-menu';
constSELECTOR_NAVBAR_NAV='.navbar-nav';
constSELECTOR_VISIBLE_ITEMS='.dropdown-menu.dropdown-item:not(.disabled):not(:disabled)';
constPLACEMENT_TOP=isRTL()?'top-end':'top-start';
constPLACEMENT_TOPEND=isRTL()?'top-start':'top-end';
constPLACEMENT_BOTTOM=isRTL()?'bottom-end':'bottom-start';
constPLACEMENT_BOTTOMEND=isRTL()?'bottom-start':'bottom-end';
constPLACEMENT_RIGHT=isRTL()?'left-start':'right-start';
constPLACEMENT_LEFT=isRTL()?'right-start':'left-start';
constDefault$8={
offset:[0,2],
boundary:'clippingParents',
reference:'toggle',
display:'dynamic',
popperConfig:null,
autoClose:true
};
constDefaultType$8={
offset:'(array|string|function)',
boundary:'(string|element)',
reference:'(string|element|object)',
display:'string',
popperConfig:'(null|object|function)',
autoClose:'(boolean|string)'
};
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classDropdownextendsBaseComponent{
constructor(element,config){
super(element);
this._popper=null;
this._config=this._getConfig(config);
this._menu=this._getMenuElement();
this._inNavbar=this._detectNavbar();
}//Getters


staticgetDefault(){
returnDefault$8;
}

staticgetDefaultType(){
returnDefaultType$8;
}

staticgetNAME(){
returnNAME$9;
}//Public


toggle(){
returnthis._isShown()?this.hide():this.show();
}

show(){
if(isDisabled(this._element)||this._isShown(this._menu)){
return;
}

constrelatedTarget={
relatedTarget:this._element
};
constshowEvent=EventHandler.trigger(this._element,EVENT_SHOW$4,relatedTarget);

if(showEvent.defaultPrevented){
return;
}

constparent=Dropdown.getParentFromElement(this._element);//TotallydisablePopperforDropdownsinNavbar

if(this._inNavbar){
Manipulator.setDataAttribute(this._menu,'popper','none');
}else{
this._createPopper(parent);
}//Ifthisisatouch-enableddeviceweaddextra
//emptymouseoverlistenerstothebody'simmediatechildren;
//onlyneededbecauseofbrokeneventdelegationoniOS
//https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


if('ontouchstart'indocument.documentElement&&!parent.closest(SELECTOR_NAVBAR_NAV)){
[].concat(...document.body.children).forEach(elem=>EventHandler.on(elem,'mouseover',noop));
}

this._element.focus();

this._element.setAttribute('aria-expanded',true);

this._menu.classList.add(CLASS_NAME_SHOW$6);

this._element.classList.add(CLASS_NAME_SHOW$6);

EventHandler.trigger(this._element,EVENT_SHOWN$4,relatedTarget);
}

hide(){
if(isDisabled(this._element)||!this._isShown(this._menu)){
return;
}

constrelatedTarget={
relatedTarget:this._element
};

this._completeHide(relatedTarget);
}

dispose(){
if(this._popper){
this._popper.destroy();
}

super.dispose();
}

update(){
this._inNavbar=this._detectNavbar();

if(this._popper){
this._popper.update();
}
}//Private


_completeHide(relatedTarget){
consthideEvent=EventHandler.trigger(this._element,EVENT_HIDE$4,relatedTarget);

if(hideEvent.defaultPrevented){
return;
}//Ifthisisatouch-enableddeviceweremovetheextra
//emptymouseoverlistenersweaddedforiOSsupport


if('ontouchstart'indocument.documentElement){
[].concat(...document.body.children).forEach(elem=>EventHandler.off(elem,'mouseover',noop));
}

if(this._popper){
this._popper.destroy();
}

this._menu.classList.remove(CLASS_NAME_SHOW$6);

this._element.classList.remove(CLASS_NAME_SHOW$6);

this._element.setAttribute('aria-expanded','false');

Manipulator.removeDataAttribute(this._menu,'popper');
EventHandler.trigger(this._element,EVENT_HIDDEN$4,relatedTarget);
}

_getConfig(config){
config={...this.constructor.Default,
...Manipulator.getDataAttributes(this._element),
...config
};
typeCheckConfig(NAME$9,config,this.constructor.DefaultType);

if(typeofconfig.reference==='object'&&!isElement$1(config.reference)&&typeofconfig.reference.getBoundingClientRect!=='function'){
//PoppervirtualelementsrequireagetBoundingClientRectmethod
thrownewTypeError(`${NAME$9.toUpperCase()}:Option"reference"providedtype"object"withoutarequired"getBoundingClientRect"method.`);
}

returnconfig;
}

_createPopper(parent){
if(typeofPopper==='undefined'){
thrownewTypeError('Bootstrap\'sdropdownsrequirePopper(https://popper.js.org)');
}

letreferenceElement=this._element;

if(this._config.reference==='parent'){
referenceElement=parent;
}elseif(isElement$1(this._config.reference)){
referenceElement=getElement(this._config.reference);
}elseif(typeofthis._config.reference==='object'){
referenceElement=this._config.reference;
}

constpopperConfig=this._getPopperConfig();

constisDisplayStatic=popperConfig.modifiers.find(modifier=>modifier.name==='applyStyles'&&modifier.enabled===false);
this._popper=createPopper(referenceElement,this._menu,popperConfig);

if(isDisplayStatic){
Manipulator.setDataAttribute(this._menu,'popper','static');
}
}

_isShown(element=this._element){
returnelement.classList.contains(CLASS_NAME_SHOW$6);
}

_getMenuElement(){
returnSelectorEngine.next(this._element,SELECTOR_MENU)[0];
}

_getPlacement(){
constparentDropdown=this._element.parentNode;

if(parentDropdown.classList.contains(CLASS_NAME_DROPEND)){
returnPLACEMENT_RIGHT;
}

if(parentDropdown.classList.contains(CLASS_NAME_DROPSTART)){
returnPLACEMENT_LEFT;
}//Weneedtotrimthevaluebecausecustompropertiescanalsoincludespaces


constisEnd=getComputedStyle(this._menu).getPropertyValue('--bs-position').trim()==='end';

if(parentDropdown.classList.contains(CLASS_NAME_DROPUP)){
returnisEnd?PLACEMENT_TOPEND:PLACEMENT_TOP;
}

returnisEnd?PLACEMENT_BOTTOMEND:PLACEMENT_BOTTOM;
}

_detectNavbar(){
returnthis._element.closest(`.${CLASS_NAME_NAVBAR}`)!==null;
}

_getOffset(){
const{
offset
}=this._config;

if(typeofoffset==='string'){
returnoffset.split(',').map(val=>Number.parseInt(val,10));
}

if(typeofoffset==='function'){
returnpopperData=>offset(popperData,this._element);
}

returnoffset;
}

_getPopperConfig(){
constdefaultBsPopperConfig={
placement:this._getPlacement(),
modifiers:[{
name:'preventOverflow',
options:{
boundary:this._config.boundary
}
},{
name:'offset',
options:{
offset:this._getOffset()
}
}]
};//DisablePopperifwehaveastaticdisplay

if(this._config.display==='static'){
defaultBsPopperConfig.modifiers=[{
name:'applyStyles',
enabled:false
}];
}

return{...defaultBsPopperConfig,
...(typeofthis._config.popperConfig==='function'?this._config.popperConfig(defaultBsPopperConfig):this._config.popperConfig)
};
}

_selectMenuItem({
key,
target
}){
constitems=SelectorEngine.find(SELECTOR_VISIBLE_ITEMS,this._menu).filter(isVisible);

if(!items.length){
return;
}//iftargetisn'tincludedinitems(e.g.whenexpandingthedropdown)
//allowcyclingtogetthelastitemincasekeyequalsARROW_UP_KEY


getNextActiveElement(items,target,key===ARROW_DOWN_KEY,!items.includes(target)).focus();
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Dropdown.getOrCreateInstance(this,config);

if(typeofconfig!=='string'){
return;
}

if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config]();
});
}

staticclearMenus(event){
if(event&&(event.button===RIGHT_MOUSE_BUTTON||event.type==='keyup'&&event.key!==TAB_KEY$1)){
return;
}

consttoggles=SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

for(leti=0,len=toggles.length;i<len;i++){
constcontext=Dropdown.getInstance(toggles[i]);

if(!context||context._config.autoClose===false){
continue;
}

if(!context._isShown()){
continue;
}

constrelatedTarget={
relatedTarget:context._element
};

if(event){
constcomposedPath=event.composedPath();
constisMenuTarget=composedPath.includes(context._menu);

if(composedPath.includes(context._element)||context._config.autoClose==='inside'&&!isMenuTarget||context._config.autoClose==='outside'&&isMenuTarget){
continue;
}//Tabnavigationthroughthedropdownmenuoreventsfromcontainedinputsshouldn'tclosethemenu


if(context._menu.contains(event.target)&&(event.type==='keyup'&&event.key===TAB_KEY$1||/input|select|option|textarea|form/i.test(event.target.tagName))){
continue;
}

if(event.type==='click'){
relatedTarget.clickEvent=event;
}
}

context._completeHide(relatedTarget);
}
}

staticgetParentFromElement(element){
returngetElementFromSelector(element)||element.parentNode;
}

staticdataApiKeydownHandler(event){
//Ifnotinput/textarea:
//-AndnotakeyinREGEXP_KEYDOWN=>notadropdowncommand
//Ifinput/textarea:
//-Ifspacekey=>notadropdowncommand
//-Ifkeyisotherthanescape
//-Ifkeyisnotupordown=>notadropdowncommand
//-Iftriggerinsidethemenu=>notadropdowncommand
if(/input|textarea/i.test(event.target.tagName)?event.key===SPACE_KEY||event.key!==ESCAPE_KEY$2&&(event.key!==ARROW_DOWN_KEY&&event.key!==ARROW_UP_KEY||event.target.closest(SELECTOR_MENU)):!REGEXP_KEYDOWN.test(event.key)){
return;
}

constisActive=this.classList.contains(CLASS_NAME_SHOW$6);

if(!isActive&&event.key===ESCAPE_KEY$2){
return;
}

event.preventDefault();
event.stopPropagation();

if(isDisabled(this)){
return;
}

constgetToggleButton=this.matches(SELECTOR_DATA_TOGGLE$3)?this:SelectorEngine.prev(this,SELECTOR_DATA_TOGGLE$3)[0];
constinstance=Dropdown.getOrCreateInstance(getToggleButton);

if(event.key===ESCAPE_KEY$2){
instance.hide();
return;
}

if(event.key===ARROW_UP_KEY||event.key===ARROW_DOWN_KEY){
if(!isActive){
instance.show();
}

instance._selectMenuItem(event);

return;
}

if(!isActive||event.key===SPACE_KEY){
Dropdown.clearMenus();
}
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_DATA_TOGGLE$3,Dropdown.dataApiKeydownHandler);
EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_MENU,Dropdown.dataApiKeydownHandler);
EventHandler.on(document,EVENT_CLICK_DATA_API$3,Dropdown.clearMenus);
EventHandler.on(document,EVENT_KEYUP_DATA_API,Dropdown.clearMenus);
EventHandler.on(document,EVENT_CLICK_DATA_API$3,SELECTOR_DATA_TOGGLE$3,function(event){
event.preventDefault();
Dropdown.getOrCreateInstance(this).toggle();
});
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.DropdowntojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Dropdown);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):util/scrollBar.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
constSELECTOR_FIXED_CONTENT='.fixed-top,.fixed-bottom,.is-fixed,.sticky-top';
constSELECTOR_STICKY_CONTENT='.sticky-top';

classScrollBarHelper{
constructor(){
this._element=document.body;
}

getWidth(){
//https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
constdocumentWidth=document.documentElement.clientWidth;
returnMath.abs(window.innerWidth-documentWidth);
}

hide(){
constwidth=this.getWidth();

this._disableOverFlow();//givepaddingtoelementtobalancethehiddenscrollbarwidth


this._setElementAttributes(this._element,'paddingRight',calculatedValue=>calculatedValue+width);//trick:WeadjustpositivepaddingRightandnegativemarginRighttosticky-topelementstokeepshowingfullwidth


this._setElementAttributes(SELECTOR_FIXED_CONTENT,'paddingRight',calculatedValue=>calculatedValue+width);

this._setElementAttributes(SELECTOR_STICKY_CONTENT,'marginRight',calculatedValue=>calculatedValue-width);
}

_disableOverFlow(){
this._saveInitialAttribute(this._element,'overflow');

this._element.style.overflow='hidden';
}

_setElementAttributes(selector,styleProp,callback){
constscrollbarWidth=this.getWidth();

constmanipulationCallBack=element=>{
if(element!==this._element&&window.innerWidth>element.clientWidth+scrollbarWidth){
return;
}

this._saveInitialAttribute(element,styleProp);

constcalculatedValue=window.getComputedStyle(element)[styleProp];
element.style[styleProp]=`${callback(Number.parseFloat(calculatedValue))}px`;
};

this._applyManipulationCallback(selector,manipulationCallBack);
}

reset(){
this._resetElementAttributes(this._element,'overflow');

this._resetElementAttributes(this._element,'paddingRight');

this._resetElementAttributes(SELECTOR_FIXED_CONTENT,'paddingRight');

this._resetElementAttributes(SELECTOR_STICKY_CONTENT,'marginRight');
}

_saveInitialAttribute(element,styleProp){
constactualValue=element.style[styleProp];

if(actualValue){
Manipulator.setDataAttribute(element,styleProp,actualValue);
}
}

_resetElementAttributes(selector,styleProp){
constmanipulationCallBack=element=>{
constvalue=Manipulator.getDataAttribute(element,styleProp);

if(typeofvalue==='undefined'){
element.style.removeProperty(styleProp);
}else{
Manipulator.removeDataAttribute(element,styleProp);
element.style[styleProp]=value;
}
};

this._applyManipulationCallback(selector,manipulationCallBack);
}

_applyManipulationCallback(selector,callBack){
if(isElement$1(selector)){
callBack(selector);
}else{
SelectorEngine.find(selector,this._element).forEach(callBack);
}
}

isOverflowing(){
returnthis.getWidth()>0;
}

}

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):util/backdrop.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*--------------------------------------------------------------------------
*/
constDefault$7={
className:'modal-backdrop',
isVisible:true,
//iffalse,weusethebackdrophelperwithoutaddinganyelementtothedom
isAnimated:false,
rootElement:'body',
//givethechoicetoplacebackdropunderdifferentelements
clickCallback:null
};
constDefaultType$7={
className:'string',
isVisible:'boolean',
isAnimated:'boolean',
rootElement:'(element|string)',
clickCallback:'(function|null)'
};
constNAME$8='backdrop';
constCLASS_NAME_FADE$4='fade';
constCLASS_NAME_SHOW$5='show';
constEVENT_MOUSEDOWN=`mousedown.bs.${NAME$8}`;

classBackdrop{
constructor(config){
this._config=this._getConfig(config);
this._isAppended=false;
this._element=null;
}

show(callback){
if(!this._config.isVisible){
execute(callback);
return;
}

this._append();

if(this._config.isAnimated){
reflow(this._getElement());
}

this._getElement().classList.add(CLASS_NAME_SHOW$5);

this._emulateAnimation(()=>{
execute(callback);
});
}

hide(callback){
if(!this._config.isVisible){
execute(callback);
return;
}

this._getElement().classList.remove(CLASS_NAME_SHOW$5);

this._emulateAnimation(()=>{
this.dispose();
execute(callback);
});
}//Private


_getElement(){
if(!this._element){
constbackdrop=document.createElement('div');
backdrop.className=this._config.className;

if(this._config.isAnimated){
backdrop.classList.add(CLASS_NAME_FADE$4);
}

this._element=backdrop;
}

returnthis._element;
}

_getConfig(config){
config={...Default$7,
...(typeofconfig==='object'?config:{})
};//usegetElement()withthedefault"body"togetafreshElementoneachinstantiation

config.rootElement=getElement(config.rootElement);
typeCheckConfig(NAME$8,config,DefaultType$7);
returnconfig;
}

_append(){
if(this._isAppended){
return;
}

this._config.rootElement.append(this._getElement());

EventHandler.on(this._getElement(),EVENT_MOUSEDOWN,()=>{
execute(this._config.clickCallback);
});
this._isAppended=true;
}

dispose(){
if(!this._isAppended){
return;
}

EventHandler.off(this._element,EVENT_MOUSEDOWN);

this._element.remove();

this._isAppended=false;
}

_emulateAnimation(callback){
executeAfterTransition(callback,this._getElement(),this._config.isAnimated);
}

}

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):util/focustrap.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*--------------------------------------------------------------------------
*/
constDefault$6={
trapElement:null,
//Theelementtotrapfocusinsideof
autofocus:true
};
constDefaultType$6={
trapElement:'element',
autofocus:'boolean'
};
constNAME$7='focustrap';
constDATA_KEY$7='bs.focustrap';
constEVENT_KEY$7=`.${DATA_KEY$7}`;
constEVENT_FOCUSIN$1=`focusin${EVENT_KEY$7}`;
constEVENT_KEYDOWN_TAB=`keydown.tab${EVENT_KEY$7}`;
constTAB_KEY='Tab';
constTAB_NAV_FORWARD='forward';
constTAB_NAV_BACKWARD='backward';

classFocusTrap{
constructor(config){
this._config=this._getConfig(config);
this._isActive=false;
this._lastTabNavDirection=null;
}

activate(){
const{
trapElement,
autofocus
}=this._config;

if(this._isActive){
return;
}

if(autofocus){
trapElement.focus();
}

EventHandler.off(document,EVENT_KEY$7);//guardagainstinfinitefocusloop

EventHandler.on(document,EVENT_FOCUSIN$1,event=>this._handleFocusin(event));
EventHandler.on(document,EVENT_KEYDOWN_TAB,event=>this._handleKeydown(event));
this._isActive=true;
}

deactivate(){
if(!this._isActive){
return;
}

this._isActive=false;
EventHandler.off(document,EVENT_KEY$7);
}//Private


_handleFocusin(event){
const{
target
}=event;
const{
trapElement
}=this._config;

if(target===document||target===trapElement||trapElement.contains(target)){
return;
}

constelements=SelectorEngine.focusableChildren(trapElement);

if(elements.length===0){
trapElement.focus();
}elseif(this._lastTabNavDirection===TAB_NAV_BACKWARD){
elements[elements.length-1].focus();
}else{
elements[0].focus();
}
}

_handleKeydown(event){
if(event.key!==TAB_KEY){
return;
}

this._lastTabNavDirection=event.shiftKey?TAB_NAV_BACKWARD:TAB_NAV_FORWARD;
}

_getConfig(config){
config={...Default$6,
...(typeofconfig==='object'?config:{})
};
typeCheckConfig(NAME$7,config,DefaultType$6);
returnconfig;
}

}

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):modal.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$6='modal';
constDATA_KEY$6='bs.modal';
constEVENT_KEY$6=`.${DATA_KEY$6}`;
constDATA_API_KEY$3='.data-api';
constESCAPE_KEY$1='Escape';
constDefault$5={
backdrop:true,
keyboard:true,
focus:true
};
constDefaultType$5={
backdrop:'(boolean|string)',
keyboard:'boolean',
focus:'boolean'
};
constEVENT_HIDE$3=`hide${EVENT_KEY$6}`;
constEVENT_HIDE_PREVENTED=`hidePrevented${EVENT_KEY$6}`;
constEVENT_HIDDEN$3=`hidden${EVENT_KEY$6}`;
constEVENT_SHOW$3=`show${EVENT_KEY$6}`;
constEVENT_SHOWN$3=`shown${EVENT_KEY$6}`;
constEVENT_RESIZE=`resize${EVENT_KEY$6}`;
constEVENT_CLICK_DISMISS=`click.dismiss${EVENT_KEY$6}`;
constEVENT_KEYDOWN_DISMISS$1=`keydown.dismiss${EVENT_KEY$6}`;
constEVENT_MOUSEUP_DISMISS=`mouseup.dismiss${EVENT_KEY$6}`;
constEVENT_MOUSEDOWN_DISMISS=`mousedown.dismiss${EVENT_KEY$6}`;
constEVENT_CLICK_DATA_API$2=`click${EVENT_KEY$6}${DATA_API_KEY$3}`;
constCLASS_NAME_OPEN='modal-open';
constCLASS_NAME_FADE$3='fade';
constCLASS_NAME_SHOW$4='show';
constCLASS_NAME_STATIC='modal-static';
constSELECTOR_DIALOG='.modal-dialog';
constSELECTOR_MODAL_BODY='.modal-body';
constSELECTOR_DATA_TOGGLE$2='[data-bs-toggle="modal"]';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classModalextendsBaseComponent{
constructor(element,config){
super(element);
this._config=this._getConfig(config);
this._dialog=SelectorEngine.findOne(SELECTOR_DIALOG,this._element);
this._backdrop=this._initializeBackDrop();
this._focustrap=this._initializeFocusTrap();
this._isShown=false;
this._ignoreBackdropClick=false;
this._isTransitioning=false;
this._scrollBar=newScrollBarHelper();
}//Getters


staticgetDefault(){
returnDefault$5;
}

staticgetNAME(){
returnNAME$6;
}//Public


toggle(relatedTarget){
returnthis._isShown?this.hide():this.show(relatedTarget);
}

show(relatedTarget){
if(this._isShown||this._isTransitioning){
return;
}

constshowEvent=EventHandler.trigger(this._element,EVENT_SHOW$3,{
relatedTarget
});

if(showEvent.defaultPrevented){
return;
}

this._isShown=true;

if(this._isAnimated()){
this._isTransitioning=true;
}

this._scrollBar.hide();

document.body.classList.add(CLASS_NAME_OPEN);

this._adjustDialog();

this._setEscapeEvent();

this._setResizeEvent();

EventHandler.on(this._dialog,EVENT_MOUSEDOWN_DISMISS,()=>{
EventHandler.one(this._element,EVENT_MOUSEUP_DISMISS,event=>{
if(event.target===this._element){
this._ignoreBackdropClick=true;
}
});
});

this._showBackdrop(()=>this._showElement(relatedTarget));
}

hide(){
if(!this._isShown||this._isTransitioning){
return;
}

consthideEvent=EventHandler.trigger(this._element,EVENT_HIDE$3);

if(hideEvent.defaultPrevented){
return;
}

this._isShown=false;

constisAnimated=this._isAnimated();

if(isAnimated){
this._isTransitioning=true;
}

this._setEscapeEvent();

this._setResizeEvent();

this._focustrap.deactivate();

this._element.classList.remove(CLASS_NAME_SHOW$4);

EventHandler.off(this._element,EVENT_CLICK_DISMISS);
EventHandler.off(this._dialog,EVENT_MOUSEDOWN_DISMISS);

this._queueCallback(()=>this._hideModal(),this._element,isAnimated);
}

dispose(){
[window,this._dialog].forEach(htmlElement=>EventHandler.off(htmlElement,EVENT_KEY$6));

this._backdrop.dispose();

this._focustrap.deactivate();

super.dispose();
}

handleUpdate(){
this._adjustDialog();
}//Private


_initializeBackDrop(){
returnnewBackdrop({
isVisible:Boolean(this._config.backdrop),
//'static'optionwillbetranslatedtotrue,andbooleanswillkeeptheirvalue
isAnimated:this._isAnimated()
});
}

_initializeFocusTrap(){
returnnewFocusTrap({
trapElement:this._element
});
}

_getConfig(config){
config={...Default$5,
...Manipulator.getDataAttributes(this._element),
...(typeofconfig==='object'?config:{})
};
typeCheckConfig(NAME$6,config,DefaultType$5);
returnconfig;
}

_showElement(relatedTarget){
constisAnimated=this._isAnimated();

constmodalBody=SelectorEngine.findOne(SELECTOR_MODAL_BODY,this._dialog);

if(!this._element.parentNode||this._element.parentNode.nodeType!==Node.ELEMENT_NODE){
//Don'tmovemodal'sDOMposition
document.body.append(this._element);
}

this._element.style.display='block';

this._element.removeAttribute('aria-hidden');

this._element.setAttribute('aria-modal',true);

this._element.setAttribute('role','dialog');

this._element.scrollTop=0;

if(modalBody){
modalBody.scrollTop=0;
}

if(isAnimated){
reflow(this._element);
}

this._element.classList.add(CLASS_NAME_SHOW$4);

consttransitionComplete=()=>{
if(this._config.focus){
this._focustrap.activate();
}

this._isTransitioning=false;
EventHandler.trigger(this._element,EVENT_SHOWN$3,{
relatedTarget
});
};

this._queueCallback(transitionComplete,this._dialog,isAnimated);
}

_setEscapeEvent(){
if(this._isShown){
EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS$1,event=>{
if(this._config.keyboard&&event.key===ESCAPE_KEY$1){
event.preventDefault();
this.hide();
}elseif(!this._config.keyboard&&event.key===ESCAPE_KEY$1){
this._triggerBackdropTransition();
}
});
}else{
EventHandler.off(this._element,EVENT_KEYDOWN_DISMISS$1);
}
}

_setResizeEvent(){
if(this._isShown){
EventHandler.on(window,EVENT_RESIZE,()=>this._adjustDialog());
}else{
EventHandler.off(window,EVENT_RESIZE);
}
}

_hideModal(){
this._element.style.display='none';

this._element.setAttribute('aria-hidden',true);

this._element.removeAttribute('aria-modal');

this._element.removeAttribute('role');

this._isTransitioning=false;

this._backdrop.hide(()=>{
document.body.classList.remove(CLASS_NAME_OPEN);

this._resetAdjustments();

this._scrollBar.reset();

EventHandler.trigger(this._element,EVENT_HIDDEN$3);
});
}

_showBackdrop(callback){
EventHandler.on(this._element,EVENT_CLICK_DISMISS,event=>{
if(this._ignoreBackdropClick){
this._ignoreBackdropClick=false;
return;
}

if(event.target!==event.currentTarget){
return;
}

if(this._config.backdrop===true){
this.hide();
}elseif(this._config.backdrop==='static'){
this._triggerBackdropTransition();
}
});

this._backdrop.show(callback);
}

_isAnimated(){
returnthis._element.classList.contains(CLASS_NAME_FADE$3);
}

_triggerBackdropTransition(){
consthideEvent=EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED);

if(hideEvent.defaultPrevented){
return;
}

const{
classList,
scrollHeight,
style
}=this._element;
constisModalOverflowing=scrollHeight>document.documentElement.clientHeight;//returnifthefollowingbackgroundtransitionhasn'tyetcompleted

if(!isModalOverflowing&&style.overflowY==='hidden'||classList.contains(CLASS_NAME_STATIC)){
return;
}

if(!isModalOverflowing){
style.overflowY='hidden';
}

classList.add(CLASS_NAME_STATIC);

this._queueCallback(()=>{
classList.remove(CLASS_NAME_STATIC);

if(!isModalOverflowing){
this._queueCallback(()=>{
style.overflowY='';
},this._dialog);
}
},this._dialog);

this._element.focus();
}//----------------------------------------------------------------------
//thefollowingmethodsareusedtohandleoverflowingmodals
//----------------------------------------------------------------------


_adjustDialog(){
constisModalOverflowing=this._element.scrollHeight>document.documentElement.clientHeight;

constscrollbarWidth=this._scrollBar.getWidth();

constisBodyOverflowing=scrollbarWidth>0;

if(!isBodyOverflowing&&isModalOverflowing&&!isRTL()||isBodyOverflowing&&!isModalOverflowing&&isRTL()){
this._element.style.paddingLeft=`${scrollbarWidth}px`;
}

if(isBodyOverflowing&&!isModalOverflowing&&!isRTL()||!isBodyOverflowing&&isModalOverflowing&&isRTL()){
this._element.style.paddingRight=`${scrollbarWidth}px`;
}
}

_resetAdjustments(){
this._element.style.paddingLeft='';
this._element.style.paddingRight='';
}//Static


staticjQueryInterface(config,relatedTarget){
returnthis.each(function(){
constdata=Modal.getOrCreateInstance(this,config);

if(typeofconfig!=='string'){
return;
}

if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config](relatedTarget);
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_CLICK_DATA_API$2,SELECTOR_DATA_TOGGLE$2,function(event){
consttarget=getElementFromSelector(this);

if(['A','AREA'].includes(this.tagName)){
event.preventDefault();
}

EventHandler.one(target,EVENT_SHOW$3,showEvent=>{
if(showEvent.defaultPrevented){
//onlyregisterfocusrestorerifmodalwillactuallygetshown
return;
}

EventHandler.one(target,EVENT_HIDDEN$3,()=>{
if(isVisible(this)){
this.focus();
}
});
});
constdata=Modal.getOrCreateInstance(target);
data.toggle(this);
});
enableDismissTrigger(Modal);
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.ModaltojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Modal);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):offcanvas.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$5='offcanvas';
constDATA_KEY$5='bs.offcanvas';
constEVENT_KEY$5=`.${DATA_KEY$5}`;
constDATA_API_KEY$2='.data-api';
constEVENT_LOAD_DATA_API$1=`load${EVENT_KEY$5}${DATA_API_KEY$2}`;
constESCAPE_KEY='Escape';
constDefault$4={
backdrop:true,
keyboard:true,
scroll:false
};
constDefaultType$4={
backdrop:'boolean',
keyboard:'boolean',
scroll:'boolean'
};
constCLASS_NAME_SHOW$3='show';
constCLASS_NAME_BACKDROP='offcanvas-backdrop';
constOPEN_SELECTOR='.offcanvas.show';
constEVENT_SHOW$2=`show${EVENT_KEY$5}`;
constEVENT_SHOWN$2=`shown${EVENT_KEY$5}`;
constEVENT_HIDE$2=`hide${EVENT_KEY$5}`;
constEVENT_HIDDEN$2=`hidden${EVENT_KEY$5}`;
constEVENT_CLICK_DATA_API$1=`click${EVENT_KEY$5}${DATA_API_KEY$2}`;
constEVENT_KEYDOWN_DISMISS=`keydown.dismiss${EVENT_KEY$5}`;
constSELECTOR_DATA_TOGGLE$1='[data-bs-toggle="offcanvas"]';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classOffcanvasextendsBaseComponent{
constructor(element,config){
super(element);
this._config=this._getConfig(config);
this._isShown=false;
this._backdrop=this._initializeBackDrop();
this._focustrap=this._initializeFocusTrap();

this._addEventListeners();
}//Getters


staticgetNAME(){
returnNAME$5;
}

staticgetDefault(){
returnDefault$4;
}//Public


toggle(relatedTarget){
returnthis._isShown?this.hide():this.show(relatedTarget);
}

show(relatedTarget){
if(this._isShown){
return;
}

constshowEvent=EventHandler.trigger(this._element,EVENT_SHOW$2,{
relatedTarget
});

if(showEvent.defaultPrevented){
return;
}

this._isShown=true;
this._element.style.visibility='visible';

this._backdrop.show();

if(!this._config.scroll){
newScrollBarHelper().hide();
}

this._element.removeAttribute('aria-hidden');

this._element.setAttribute('aria-modal',true);

this._element.setAttribute('role','dialog');

this._element.classList.add(CLASS_NAME_SHOW$3);

constcompleteCallBack=()=>{
if(!this._config.scroll){
this._focustrap.activate();
}

EventHandler.trigger(this._element,EVENT_SHOWN$2,{
relatedTarget
});
};

this._queueCallback(completeCallBack,this._element,true);
}

hide(){
if(!this._isShown){
return;
}

consthideEvent=EventHandler.trigger(this._element,EVENT_HIDE$2);

if(hideEvent.defaultPrevented){
return;
}

this._focustrap.deactivate();

this._element.blur();

this._isShown=false;

this._element.classList.remove(CLASS_NAME_SHOW$3);

this._backdrop.hide();

constcompleteCallback=()=>{
this._element.setAttribute('aria-hidden',true);

this._element.removeAttribute('aria-modal');

this._element.removeAttribute('role');

this._element.style.visibility='hidden';

if(!this._config.scroll){
newScrollBarHelper().reset();
}

EventHandler.trigger(this._element,EVENT_HIDDEN$2);
};

this._queueCallback(completeCallback,this._element,true);
}

dispose(){
this._backdrop.dispose();

this._focustrap.deactivate();

super.dispose();
}//Private


_getConfig(config){
config={...Default$4,
...Manipulator.getDataAttributes(this._element),
...(typeofconfig==='object'?config:{})
};
typeCheckConfig(NAME$5,config,DefaultType$4);
returnconfig;
}

_initializeBackDrop(){
returnnewBackdrop({
className:CLASS_NAME_BACKDROP,
isVisible:this._config.backdrop,
isAnimated:true,
rootElement:this._element.parentNode,
clickCallback:()=>this.hide()
});
}

_initializeFocusTrap(){
returnnewFocusTrap({
trapElement:this._element
});
}

_addEventListeners(){
EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS,event=>{
if(this._config.keyboard&&event.key===ESCAPE_KEY){
this.hide();
}
});
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Offcanvas.getOrCreateInstance(this,config);

if(typeofconfig!=='string'){
return;
}

if(data[config]===undefined||config.startsWith('_')||config==='constructor'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config](this);
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_CLICK_DATA_API$1,SELECTOR_DATA_TOGGLE$1,function(event){
consttarget=getElementFromSelector(this);

if(['A','AREA'].includes(this.tagName)){
event.preventDefault();
}

if(isDisabled(this)){
return;
}

EventHandler.one(target,EVENT_HIDDEN$2,()=>{
//focusontriggerwhenitisclosed
if(isVisible(this)){
this.focus();
}
});//avoidconflictwhenclickingatogglerofanoffcanvas,whileanotherisopen

constallReadyOpen=SelectorEngine.findOne(OPEN_SELECTOR);

if(allReadyOpen&&allReadyOpen!==target){
Offcanvas.getInstance(allReadyOpen).hide();
}

constdata=Offcanvas.getOrCreateInstance(target);
data.toggle(this);
});
EventHandler.on(window,EVENT_LOAD_DATA_API$1,()=>SelectorEngine.find(OPEN_SELECTOR).forEach(el=>Offcanvas.getOrCreateInstance(el).show()));
enableDismissTrigger(Offcanvas);
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*/

defineJQueryPlugin(Offcanvas);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):util/sanitizer.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
consturiAttrs=newSet(['background','cite','href','itemtype','longdesc','poster','src','xlink:href']);
constARIA_ATTRIBUTE_PATTERN=/^aria-[\w-]*$/i;
/**
*ApatternthatrecognizesacommonlyusefulsubsetofURLsthataresafe.
*
*ShoutouttoAngular7https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
*/

constSAFE_URL_PATTERN=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
/**
*ApatternthatmatchessafedataURLs.Onlymatchesimage,videoandaudiotypes.
*
*ShoutouttoAngular7https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
*/

constDATA_URL_PATTERN=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

constallowedAttribute=(attr,allowedAttributeList)=>{
constattrName=attr.nodeName.toLowerCase();

if(allowedAttributeList.includes(attrName)){
if(uriAttrs.has(attrName)){
returnBoolean(SAFE_URL_PATTERN.test(attr.nodeValue)||DATA_URL_PATTERN.test(attr.nodeValue));
}

returntrue;
}

constregExp=allowedAttributeList.filter(attrRegex=>attrRegexinstanceofRegExp);//Checkifaregularexpressionvalidatestheattribute.

for(leti=0,len=regExp.length;i<len;i++){
if(regExp[i].test(attrName)){
returntrue;
}
}

returnfalse;
};

constDefaultAllowlist={
//Globalattributesallowedonanysuppliedelementbelow.
'*':['class','dir','id','lang','role',ARIA_ATTRIBUTE_PATTERN],
a:['target','href','title','rel'],
area:[],
b:[],
br:[],
col:[],
code:[],
div:[],
em:[],
hr:[],
h1:[],
h2:[],
h3:[],
h4:[],
h5:[],
h6:[],
i:[],
img:['src','srcset','alt','title','width','height'],
li:[],
ol:[],
p:[],
pre:[],
s:[],
small:[],
span:[],
sub:[],
sup:[],
strong:[],
u:[],
ul:[]
};
functionsanitizeHtml(unsafeHtml,allowList,sanitizeFn){
if(!unsafeHtml.length){
returnunsafeHtml;
}

if(sanitizeFn&&typeofsanitizeFn==='function'){
returnsanitizeFn(unsafeHtml);
}

constdomParser=newwindow.DOMParser();
constcreatedDocument=domParser.parseFromString(unsafeHtml,'text/html');
constallowlistKeys=Object.keys(allowList);
constelements=[].concat(...createdDocument.body.querySelectorAll('*'));

for(leti=0,len=elements.length;i<len;i++){
constel=elements[i];
constelName=el.nodeName.toLowerCase();

if(!allowlistKeys.includes(elName)){
el.remove();
continue;
}

constattributeList=[].concat(...el.attributes);
constallowedAttributes=[].concat(allowList['*']||[],allowList[elName]||[]);
attributeList.forEach(attr=>{
if(!allowedAttribute(attr,allowedAttributes)){
el.removeAttribute(attr.nodeName);
}
});
}

returncreatedDocument.body.innerHTML;
}

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):tooltip.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$4='tooltip';
constDATA_KEY$4='bs.tooltip';
constEVENT_KEY$4=`.${DATA_KEY$4}`;
constCLASS_PREFIX$1='bs-tooltip';
constDISALLOWED_ATTRIBUTES=newSet(['sanitize','allowList','sanitizeFn']);
constDefaultType$3={
animation:'boolean',
template:'string',
title:'(string|element|function)',
trigger:'string',
delay:'(number|object)',
html:'boolean',
selector:'(string|boolean)',
placement:'(string|function)',
offset:'(array|string|function)',
container:'(string|element|boolean)',
fallbackPlacements:'array',
boundary:'(string|element)',
customClass:'(string|function)',
sanitize:'boolean',
sanitizeFn:'(null|function)',
allowList:'object',
popperConfig:'(null|object|function)'
};
constAttachmentMap={
AUTO:'auto',
TOP:'top',
RIGHT:isRTL()?'left':'right',
BOTTOM:'bottom',
LEFT:isRTL()?'right':'left'
};
constDefault$3={
animation:true,
template:'<divclass="tooltip"role="tooltip">'+'<divclass="tooltip-arrow"></div>'+'<divclass="tooltip-inner"></div>'+'</div>',
trigger:'hoverfocus',
title:'',
delay:0,
html:false,
selector:false,
placement:'top',
offset:[0,0],
container:false,
fallbackPlacements:['top','right','bottom','left'],
boundary:'clippingParents',
customClass:'',
sanitize:true,
sanitizeFn:null,
allowList:DefaultAllowlist,
popperConfig:null
};
constEvent$2={
HIDE:`hide${EVENT_KEY$4}`,
HIDDEN:`hidden${EVENT_KEY$4}`,
SHOW:`show${EVENT_KEY$4}`,
SHOWN:`shown${EVENT_KEY$4}`,
INSERTED:`inserted${EVENT_KEY$4}`,
CLICK:`click${EVENT_KEY$4}`,
FOCUSIN:`focusin${EVENT_KEY$4}`,
FOCUSOUT:`focusout${EVENT_KEY$4}`,
MOUSEENTER:`mouseenter${EVENT_KEY$4}`,
MOUSELEAVE:`mouseleave${EVENT_KEY$4}`
};
constCLASS_NAME_FADE$2='fade';
constCLASS_NAME_MODAL='modal';
constCLASS_NAME_SHOW$2='show';
constHOVER_STATE_SHOW='show';
constHOVER_STATE_OUT='out';
constSELECTOR_TOOLTIP_INNER='.tooltip-inner';
constSELECTOR_MODAL=`.${CLASS_NAME_MODAL}`;
constEVENT_MODAL_HIDE='hide.bs.modal';
constTRIGGER_HOVER='hover';
constTRIGGER_FOCUS='focus';
constTRIGGER_CLICK='click';
constTRIGGER_MANUAL='manual';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classTooltipextendsBaseComponent{
constructor(element,config){
if(typeofPopper==='undefined'){
thrownewTypeError('Bootstrap\'stooltipsrequirePopper(https://popper.js.org)');
}

super(element);//private

this._isEnabled=true;
this._timeout=0;
this._hoverState='';
this._activeTrigger={};
this._popper=null;//Protected

this._config=this._getConfig(config);
this.tip=null;

this._setListeners();
}//Getters


staticgetDefault(){
returnDefault$3;
}

staticgetNAME(){
returnNAME$4;
}

staticgetEvent(){
returnEvent$2;
}

staticgetDefaultType(){
returnDefaultType$3;
}//Public


enable(){
this._isEnabled=true;
}

disable(){
this._isEnabled=false;
}

toggleEnabled(){
this._isEnabled=!this._isEnabled;
}

toggle(event){
if(!this._isEnabled){
return;
}

if(event){
constcontext=this._initializeOnDelegatedTarget(event);

context._activeTrigger.click=!context._activeTrigger.click;

if(context._isWithActiveTrigger()){
context._enter(null,context);
}else{
context._leave(null,context);
}
}else{
if(this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)){
this._leave(null,this);

return;
}

this._enter(null,this);
}
}

dispose(){
clearTimeout(this._timeout);
EventHandler.off(this._element.closest(SELECTOR_MODAL),EVENT_MODAL_HIDE,this._hideModalHandler);

if(this.tip){
this.tip.remove();
}

if(this._popper){
this._popper.destroy();
}

super.dispose();
}

show(){
if(this._element.style.display==='none'){
thrownewError('Pleaseuseshowonvisibleelements');
}

if(!(this.isWithContent()&&this._isEnabled)){
return;
}

constshowEvent=EventHandler.trigger(this._element,this.constructor.Event.SHOW);
constshadowRoot=findShadowRoot(this._element);
constisInTheDom=shadowRoot===null?this._element.ownerDocument.documentElement.contains(this._element):shadowRoot.contains(this._element);

if(showEvent.defaultPrevented||!isInTheDom){
return;
}

consttip=this.getTipElement();
consttipId=getUID(this.constructor.NAME);
tip.setAttribute('id',tipId);

this._element.setAttribute('aria-describedby',tipId);

if(this._config.animation){
tip.classList.add(CLASS_NAME_FADE$2);
}

constplacement=typeofthis._config.placement==='function'?this._config.placement.call(this,tip,this._element):this._config.placement;

constattachment=this._getAttachment(placement);

this._addAttachmentClass(attachment);

const{
container
}=this._config;
Data.set(tip,this.constructor.DATA_KEY,this);

if(!this._element.ownerDocument.documentElement.contains(this.tip)){
container.append(tip);
EventHandler.trigger(this._element,this.constructor.Event.INSERTED);
}

if(this._popper){
this._popper.update();
}else{
this._popper=createPopper(this._element,tip,this._getPopperConfig(attachment));
}

tip.classList.add(CLASS_NAME_SHOW$2);

constcustomClass=this._resolvePossibleFunction(this._config.customClass);

if(customClass){
tip.classList.add(...customClass.split(''));
}//Ifthisisatouch-enableddeviceweaddextra
//emptymouseoverlistenerstothebody'simmediatechildren;
//onlyneededbecauseofbrokeneventdelegationoniOS
//https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


if('ontouchstart'indocument.documentElement){
[].concat(...document.body.children).forEach(element=>{
EventHandler.on(element,'mouseover',noop);
});
}

constcomplete=()=>{
constprevHoverState=this._hoverState;
this._hoverState=null;
EventHandler.trigger(this._element,this.constructor.Event.SHOWN);

if(prevHoverState===HOVER_STATE_OUT){
this._leave(null,this);
}
};

constisAnimated=this.tip.classList.contains(CLASS_NAME_FADE$2);

this._queueCallback(complete,this.tip,isAnimated);
}

hide(){
if(!this._popper){
return;
}

consttip=this.getTipElement();

constcomplete=()=>{
if(this._isWithActiveTrigger()){
return;
}

if(this._hoverState!==HOVER_STATE_SHOW){
tip.remove();
}

this._cleanTipClass();

this._element.removeAttribute('aria-describedby');

EventHandler.trigger(this._element,this.constructor.Event.HIDDEN);

if(this._popper){
this._popper.destroy();

this._popper=null;
}
};

consthideEvent=EventHandler.trigger(this._element,this.constructor.Event.HIDE);

if(hideEvent.defaultPrevented){
return;
}

tip.classList.remove(CLASS_NAME_SHOW$2);//Ifthisisatouch-enableddeviceweremovetheextra
//emptymouseoverlistenersweaddedforiOSsupport

if('ontouchstart'indocument.documentElement){
[].concat(...document.body.children).forEach(element=>EventHandler.off(element,'mouseover',noop));
}

this._activeTrigger[TRIGGER_CLICK]=false;
this._activeTrigger[TRIGGER_FOCUS]=false;
this._activeTrigger[TRIGGER_HOVER]=false;
constisAnimated=this.tip.classList.contains(CLASS_NAME_FADE$2);

this._queueCallback(complete,this.tip,isAnimated);

this._hoverState='';
}

update(){
if(this._popper!==null){
this._popper.update();
}
}//Protected


isWithContent(){
returnBoolean(this.getTitle());
}

getTipElement(){
if(this.tip){
returnthis.tip;
}

constelement=document.createElement('div');
element.innerHTML=this._config.template;
consttip=element.children[0];
this.setContent(tip);
tip.classList.remove(CLASS_NAME_FADE$2,CLASS_NAME_SHOW$2);
this.tip=tip;
returnthis.tip;
}

setContent(tip){
this._sanitizeAndSetContent(tip,this.getTitle(),SELECTOR_TOOLTIP_INNER);
}

_sanitizeAndSetContent(template,content,selector){
consttemplateElement=SelectorEngine.findOne(selector,template);

if(!content&&templateElement){
templateElement.remove();
return;
}//weuseappendforhtmlobjectstomaintainjsevents


this.setElementContent(templateElement,content);
}

setElementContent(element,content){
if(element===null){
return;
}

if(isElement$1(content)){
content=getElement(content);//contentisaDOMnodeorajQuery

if(this._config.html){
if(content.parentNode!==element){
element.innerHTML='';
element.append(content);
}
}else{
element.textContent=content.textContent;
}

return;
}

if(this._config.html){
if(this._config.sanitize){
content=sanitizeHtml(content,this._config.allowList,this._config.sanitizeFn);
}

element.innerHTML=content;
}else{
element.textContent=content;
}
}

getTitle(){
consttitle=this._element.getAttribute('data-bs-original-title')||this._config.title;

returnthis._resolvePossibleFunction(title);
}

updateAttachment(attachment){
if(attachment==='right'){
return'end';
}

if(attachment==='left'){
return'start';
}

returnattachment;
}//Private


_initializeOnDelegatedTarget(event,context){
returncontext||this.constructor.getOrCreateInstance(event.delegateTarget,this._getDelegateConfig());
}

_getOffset(){
const{
offset
}=this._config;

if(typeofoffset==='string'){
returnoffset.split(',').map(val=>Number.parseInt(val,10));
}

if(typeofoffset==='function'){
returnpopperData=>offset(popperData,this._element);
}

returnoffset;
}

_resolvePossibleFunction(content){
returntypeofcontent==='function'?content.call(this._element):content;
}

_getPopperConfig(attachment){
constdefaultBsPopperConfig={
placement:attachment,
modifiers:[{
name:'flip',
options:{
fallbackPlacements:this._config.fallbackPlacements
}
},{
name:'offset',
options:{
offset:this._getOffset()
}
},{
name:'preventOverflow',
options:{
boundary:this._config.boundary
}
},{
name:'arrow',
options:{
element:`.${this.constructor.NAME}-arrow`
}
},{
name:'onChange',
enabled:true,
phase:'afterWrite',
fn:data=>this._handlePopperPlacementChange(data)
}],
onFirstUpdate:data=>{
if(data.options.placement!==data.placement){
this._handlePopperPlacementChange(data);
}
}
};
return{...defaultBsPopperConfig,
...(typeofthis._config.popperConfig==='function'?this._config.popperConfig(defaultBsPopperConfig):this._config.popperConfig)
};
}

_addAttachmentClass(attachment){
this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
}

_getAttachment(placement){
returnAttachmentMap[placement.toUpperCase()];
}

_setListeners(){
consttriggers=this._config.trigger.split('');

triggers.forEach(trigger=>{
if(trigger==='click'){
EventHandler.on(this._element,this.constructor.Event.CLICK,this._config.selector,event=>this.toggle(event));
}elseif(trigger!==TRIGGER_MANUAL){
consteventIn=trigger===TRIGGER_HOVER?this.constructor.Event.MOUSEENTER:this.constructor.Event.FOCUSIN;
consteventOut=trigger===TRIGGER_HOVER?this.constructor.Event.MOUSELEAVE:this.constructor.Event.FOCUSOUT;
EventHandler.on(this._element,eventIn,this._config.selector,event=>this._enter(event));
EventHandler.on(this._element,eventOut,this._config.selector,event=>this._leave(event));
}
});

this._hideModalHandler=()=>{
if(this._element){
this.hide();
}
};

EventHandler.on(this._element.closest(SELECTOR_MODAL),EVENT_MODAL_HIDE,this._hideModalHandler);

if(this._config.selector){
this._config={...this._config,
trigger:'manual',
selector:''
};
}else{
this._fixTitle();
}
}

_fixTitle(){
consttitle=this._element.getAttribute('title');

constoriginalTitleType=typeofthis._element.getAttribute('data-bs-original-title');

if(title||originalTitleType!=='string'){
this._element.setAttribute('data-bs-original-title',title||'');

if(title&&!this._element.getAttribute('aria-label')&&!this._element.textContent){
this._element.setAttribute('aria-label',title);
}

this._element.setAttribute('title','');
}
}

_enter(event,context){
context=this._initializeOnDelegatedTarget(event,context);

if(event){
context._activeTrigger[event.type==='focusin'?TRIGGER_FOCUS:TRIGGER_HOVER]=true;
}

if(context.getTipElement().classList.contains(CLASS_NAME_SHOW$2)||context._hoverState===HOVER_STATE_SHOW){
context._hoverState=HOVER_STATE_SHOW;
return;
}

clearTimeout(context._timeout);
context._hoverState=HOVER_STATE_SHOW;

if(!context._config.delay||!context._config.delay.show){
context.show();
return;
}

context._timeout=setTimeout(()=>{
if(context._hoverState===HOVER_STATE_SHOW){
context.show();
}
},context._config.delay.show);
}

_leave(event,context){
context=this._initializeOnDelegatedTarget(event,context);

if(event){
context._activeTrigger[event.type==='focusout'?TRIGGER_FOCUS:TRIGGER_HOVER]=context._element.contains(event.relatedTarget);
}

if(context._isWithActiveTrigger()){
return;
}

clearTimeout(context._timeout);
context._hoverState=HOVER_STATE_OUT;

if(!context._config.delay||!context._config.delay.hide){
context.hide();
return;
}

context._timeout=setTimeout(()=>{
if(context._hoverState===HOVER_STATE_OUT){
context.hide();
}
},context._config.delay.hide);
}

_isWithActiveTrigger(){
for(consttriggerinthis._activeTrigger){
if(this._activeTrigger[trigger]){
returntrue;
}
}

returnfalse;
}

_getConfig(config){
constdataAttributes=Manipulator.getDataAttributes(this._element);
Object.keys(dataAttributes).forEach(dataAttr=>{
if(DISALLOWED_ATTRIBUTES.has(dataAttr)){
deletedataAttributes[dataAttr];
}
});
config={...this.constructor.Default,
...dataAttributes,
...(typeofconfig==='object'&&config?config:{})
};
config.container=config.container===false?document.body:getElement(config.container);

if(typeofconfig.delay==='number'){
config.delay={
show:config.delay,
hide:config.delay
};
}

if(typeofconfig.title==='number'){
config.title=config.title.toString();
}

if(typeofconfig.content==='number'){
config.content=config.content.toString();
}

typeCheckConfig(NAME$4,config,this.constructor.DefaultType);

if(config.sanitize){
config.template=sanitizeHtml(config.template,config.allowList,config.sanitizeFn);
}

returnconfig;
}

_getDelegateConfig(){
constconfig={};

for(constkeyinthis._config){
if(this.constructor.Default[key]!==this._config[key]){
config[key]=this._config[key];
}
}//Inthefuturecanbereplacedwith:
//constkeysWithDifferentValues=Object.entries(this._config).filter(entry=>this.constructor.Default[entry[0]]!==this._config[entry[0]])
//`Object.fromEntries(keysWithDifferentValues)`


returnconfig;
}

_cleanTipClass(){
consttip=this.getTipElement();
constbasicClassPrefixRegex=newRegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`,'g');
consttabClass=tip.getAttribute('class').match(basicClassPrefixRegex);

if(tabClass!==null&&tabClass.length>0){
tabClass.map(token=>token.trim()).forEach(tClass=>tip.classList.remove(tClass));
}
}

_getBasicClassPrefix(){
returnCLASS_PREFIX$1;
}

_handlePopperPlacementChange(popperData){
const{
state
}=popperData;

if(!state){
return;
}

this.tip=state.elements.popper;

this._cleanTipClass();

this._addAttachmentClass(this._getAttachment(state.placement));
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Tooltip.getOrCreateInstance(this,config);

if(typeofconfig==='string'){
if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config]();
}
});
}

}
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.TooltiptojQueryonlyifjQueryispresent
*/


defineJQueryPlugin(Tooltip);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):popover.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$3='popover';
constDATA_KEY$3='bs.popover';
constEVENT_KEY$3=`.${DATA_KEY$3}`;
constCLASS_PREFIX='bs-popover';
constDefault$2={...Tooltip.Default,
placement:'right',
offset:[0,8],
trigger:'click',
content:'',
template:'<divclass="popover"role="tooltip">'+'<divclass="popover-arrow"></div>'+'<h3class="popover-header"></h3>'+'<divclass="popover-body"></div>'+'</div>'
};
constDefaultType$2={...Tooltip.DefaultType,
content:'(string|element|function)'
};
constEvent$1={
HIDE:`hide${EVENT_KEY$3}`,
HIDDEN:`hidden${EVENT_KEY$3}`,
SHOW:`show${EVENT_KEY$3}`,
SHOWN:`shown${EVENT_KEY$3}`,
INSERTED:`inserted${EVENT_KEY$3}`,
CLICK:`click${EVENT_KEY$3}`,
FOCUSIN:`focusin${EVENT_KEY$3}`,
FOCUSOUT:`focusout${EVENT_KEY$3}`,
MOUSEENTER:`mouseenter${EVENT_KEY$3}`,
MOUSELEAVE:`mouseleave${EVENT_KEY$3}`
};
constSELECTOR_TITLE='.popover-header';
constSELECTOR_CONTENT='.popover-body';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classPopoverextendsTooltip{
//Getters
staticgetDefault(){
returnDefault$2;
}

staticgetNAME(){
returnNAME$3;
}

staticgetEvent(){
returnEvent$1;
}

staticgetDefaultType(){
returnDefaultType$2;
}//Overrides


isWithContent(){
returnthis.getTitle()||this._getContent();
}

setContent(tip){
this._sanitizeAndSetContent(tip,this.getTitle(),SELECTOR_TITLE);

this._sanitizeAndSetContent(tip,this._getContent(),SELECTOR_CONTENT);
}//Private


_getContent(){
returnthis._resolvePossibleFunction(this._config.content);
}

_getBasicClassPrefix(){
returnCLASS_PREFIX;
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Popover.getOrCreateInstance(this,config);

if(typeofconfig==='string'){
if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config]();
}
});
}

}
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.PopovertojQueryonlyifjQueryispresent
*/


defineJQueryPlugin(Popover);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):scrollspy.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$2='scrollspy';
constDATA_KEY$2='bs.scrollspy';
constEVENT_KEY$2=`.${DATA_KEY$2}`;
constDATA_API_KEY$1='.data-api';
constDefault$1={
offset:10,
method:'auto',
target:''
};
constDefaultType$1={
offset:'number',
method:'string',
target:'(string|element)'
};
constEVENT_ACTIVATE=`activate${EVENT_KEY$2}`;
constEVENT_SCROLL=`scroll${EVENT_KEY$2}`;
constEVENT_LOAD_DATA_API=`load${EVENT_KEY$2}${DATA_API_KEY$1}`;
constCLASS_NAME_DROPDOWN_ITEM='dropdown-item';
constCLASS_NAME_ACTIVE$1='active';
constSELECTOR_DATA_SPY='[data-bs-spy="scroll"]';
constSELECTOR_NAV_LIST_GROUP$1='.nav,.list-group';
constSELECTOR_NAV_LINKS='.nav-link';
constSELECTOR_NAV_ITEMS='.nav-item';
constSELECTOR_LIST_ITEMS='.list-group-item';
constSELECTOR_LINK_ITEMS=`${SELECTOR_NAV_LINKS},${SELECTOR_LIST_ITEMS},.${CLASS_NAME_DROPDOWN_ITEM}`;
constSELECTOR_DROPDOWN$1='.dropdown';
constSELECTOR_DROPDOWN_TOGGLE$1='.dropdown-toggle';
constMETHOD_OFFSET='offset';
constMETHOD_POSITION='position';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classScrollSpyextendsBaseComponent{
constructor(element,config){
super(element);
this._scrollElement=this._element.tagName==='BODY'?window:this._element;
this._config=this._getConfig(config);
this._offsets=[];
this._targets=[];
this._activeTarget=null;
this._scrollHeight=0;
EventHandler.on(this._scrollElement,EVENT_SCROLL,()=>this._process());
this.refresh();

this._process();
}//Getters


staticgetDefault(){
returnDefault$1;
}

staticgetNAME(){
returnNAME$2;
}//Public


refresh(){
constautoMethod=this._scrollElement===this._scrollElement.window?METHOD_OFFSET:METHOD_POSITION;
constoffsetMethod=this._config.method==='auto'?autoMethod:this._config.method;
constoffsetBase=offsetMethod===METHOD_POSITION?this._getScrollTop():0;
this._offsets=[];
this._targets=[];
this._scrollHeight=this._getScrollHeight();
consttargets=SelectorEngine.find(SELECTOR_LINK_ITEMS,this._config.target);
targets.map(element=>{
consttargetSelector=getSelectorFromElement(element);
consttarget=targetSelector?SelectorEngine.findOne(targetSelector):null;

if(target){
consttargetBCR=target.getBoundingClientRect();

if(targetBCR.width||targetBCR.height){
return[Manipulator[offsetMethod](target).top+offsetBase,targetSelector];
}
}

returnnull;
}).filter(item=>item).sort((a,b)=>a[0]-b[0]).forEach(item=>{
this._offsets.push(item[0]);

this._targets.push(item[1]);
});
}

dispose(){
EventHandler.off(this._scrollElement,EVENT_KEY$2);
super.dispose();
}//Private


_getConfig(config){
config={...Default$1,
...Manipulator.getDataAttributes(this._element),
...(typeofconfig==='object'&&config?config:{})
};
config.target=getElement(config.target)||document.documentElement;
typeCheckConfig(NAME$2,config,DefaultType$1);
returnconfig;
}

_getScrollTop(){
returnthis._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop;
}

_getScrollHeight(){
returnthis._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}

_getOffsetHeight(){
returnthis._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height;
}

_process(){
constscrollTop=this._getScrollTop()+this._config.offset;

constscrollHeight=this._getScrollHeight();

constmaxScroll=this._config.offset+scrollHeight-this._getOffsetHeight();

if(this._scrollHeight!==scrollHeight){
this.refresh();
}

if(scrollTop>=maxScroll){
consttarget=this._targets[this._targets.length-1];

if(this._activeTarget!==target){
this._activate(target);
}

return;
}

if(this._activeTarget&&scrollTop<this._offsets[0]&&this._offsets[0]>0){
this._activeTarget=null;

this._clear();

return;
}

for(leti=this._offsets.length;i--;){
constisActiveTarget=this._activeTarget!==this._targets[i]&&scrollTop>=this._offsets[i]&&(typeofthis._offsets[i+1]==='undefined'||scrollTop<this._offsets[i+1]);

if(isActiveTarget){
this._activate(this._targets[i]);
}
}
}

_activate(target){
this._activeTarget=target;

this._clear();

constqueries=SELECTOR_LINK_ITEMS.split(',').map(selector=>`${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
constlink=SelectorEngine.findOne(queries.join(','),this._config.target);
link.classList.add(CLASS_NAME_ACTIVE$1);

if(link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)){
SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1,link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
}else{
SelectorEngine.parents(link,SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup=>{
//Settriggeredlinksparentsasactive
//Withboth<ul>and<nav>markupaparentistheprevioussiblingofanynavancestor
SelectorEngine.prev(listGroup,`${SELECTOR_NAV_LINKS},${SELECTOR_LIST_ITEMS}`).forEach(item=>item.classList.add(CLASS_NAME_ACTIVE$1));//Handlespecialcasewhen.nav-linkisinside.nav-item

SelectorEngine.prev(listGroup,SELECTOR_NAV_ITEMS).forEach(navItem=>{
SelectorEngine.children(navItem,SELECTOR_NAV_LINKS).forEach(item=>item.classList.add(CLASS_NAME_ACTIVE$1));
});
});
}

EventHandler.trigger(this._scrollElement,EVENT_ACTIVATE,{
relatedTarget:target
});
}

_clear(){
SelectorEngine.find(SELECTOR_LINK_ITEMS,this._config.target).filter(node=>node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node=>node.classList.remove(CLASS_NAME_ACTIVE$1));
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=ScrollSpy.getOrCreateInstance(this,config);

if(typeofconfig!=='string'){
return;
}

if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config]();
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(window,EVENT_LOAD_DATA_API,()=>{
SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy=>newScrollSpy(spy));
});
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.ScrollSpytojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(ScrollSpy);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):tab.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME$1='tab';
constDATA_KEY$1='bs.tab';
constEVENT_KEY$1=`.${DATA_KEY$1}`;
constDATA_API_KEY='.data-api';
constEVENT_HIDE$1=`hide${EVENT_KEY$1}`;
constEVENT_HIDDEN$1=`hidden${EVENT_KEY$1}`;
constEVENT_SHOW$1=`show${EVENT_KEY$1}`;
constEVENT_SHOWN$1=`shown${EVENT_KEY$1}`;
constEVENT_CLICK_DATA_API=`click${EVENT_KEY$1}${DATA_API_KEY}`;
constCLASS_NAME_DROPDOWN_MENU='dropdown-menu';
constCLASS_NAME_ACTIVE='active';
constCLASS_NAME_FADE$1='fade';
constCLASS_NAME_SHOW$1='show';
constSELECTOR_DROPDOWN='.dropdown';
constSELECTOR_NAV_LIST_GROUP='.nav,.list-group';
constSELECTOR_ACTIVE='.active';
constSELECTOR_ACTIVE_UL=':scope>li>.active';
constSELECTOR_DATA_TOGGLE='[data-bs-toggle="tab"],[data-bs-toggle="pill"],[data-bs-toggle="list"]';
constSELECTOR_DROPDOWN_TOGGLE='.dropdown-toggle';
constSELECTOR_DROPDOWN_ACTIVE_CHILD=':scope>.dropdown-menu.active';
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classTabextendsBaseComponent{
//Getters
staticgetNAME(){
returnNAME$1;
}//Public


show(){
if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(CLASS_NAME_ACTIVE)){
return;
}

letprevious;
consttarget=getElementFromSelector(this._element);

constlistElement=this._element.closest(SELECTOR_NAV_LIST_GROUP);

if(listElement){
constitemSelector=listElement.nodeName==='UL'||listElement.nodeName==='OL'?SELECTOR_ACTIVE_UL:SELECTOR_ACTIVE;
previous=SelectorEngine.find(itemSelector,listElement);
previous=previous[previous.length-1];
}

consthideEvent=previous?EventHandler.trigger(previous,EVENT_HIDE$1,{
relatedTarget:this._element
}):null;
constshowEvent=EventHandler.trigger(this._element,EVENT_SHOW$1,{
relatedTarget:previous
});

if(showEvent.defaultPrevented||hideEvent!==null&&hideEvent.defaultPrevented){
return;
}

this._activate(this._element,listElement);

constcomplete=()=>{
EventHandler.trigger(previous,EVENT_HIDDEN$1,{
relatedTarget:this._element
});
EventHandler.trigger(this._element,EVENT_SHOWN$1,{
relatedTarget:previous
});
};

if(target){
this._activate(target,target.parentNode,complete);
}else{
complete();
}
}//Private


_activate(element,container,callback){
constactiveElements=container&&(container.nodeName==='UL'||container.nodeName==='OL')?SelectorEngine.find(SELECTOR_ACTIVE_UL,container):SelectorEngine.children(container,SELECTOR_ACTIVE);
constactive=activeElements[0];
constisTransitioning=callback&&active&&active.classList.contains(CLASS_NAME_FADE$1);

constcomplete=()=>this._transitionComplete(element,active,callback);

if(active&&isTransitioning){
active.classList.remove(CLASS_NAME_SHOW$1);

this._queueCallback(complete,element,true);
}else{
complete();
}
}

_transitionComplete(element,active,callback){
if(active){
active.classList.remove(CLASS_NAME_ACTIVE);
constdropdownChild=SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD,active.parentNode);

if(dropdownChild){
dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
}

if(active.getAttribute('role')==='tab'){
active.setAttribute('aria-selected',false);
}
}

element.classList.add(CLASS_NAME_ACTIVE);

if(element.getAttribute('role')==='tab'){
element.setAttribute('aria-selected',true);
}

reflow(element);

if(element.classList.contains(CLASS_NAME_FADE$1)){
element.classList.add(CLASS_NAME_SHOW$1);
}

letparent=element.parentNode;

if(parent&&parent.nodeName==='LI'){
parent=parent.parentNode;
}

if(parent&&parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)){
constdropdownElement=element.closest(SELECTOR_DROPDOWN);

if(dropdownElement){
SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE,dropdownElement).forEach(dropdown=>dropdown.classList.add(CLASS_NAME_ACTIVE));
}

element.setAttribute('aria-expanded',true);
}

if(callback){
callback();
}
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Tab.getOrCreateInstance(this);

if(typeofconfig==='string'){
if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config]();
}
});
}

}
/**
*------------------------------------------------------------------------
*DataApiimplementation
*------------------------------------------------------------------------
*/


EventHandler.on(document,EVENT_CLICK_DATA_API,SELECTOR_DATA_TOGGLE,function(event){
if(['A','AREA'].includes(this.tagName)){
event.preventDefault();
}

if(isDisabled(this)){
return;
}

constdata=Tab.getOrCreateInstance(this);
data.show();
});
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.TabtojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Tab);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):toast.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
/**
*------------------------------------------------------------------------
*Constants
*------------------------------------------------------------------------
*/

constNAME='toast';
constDATA_KEY='bs.toast';
constEVENT_KEY=`.${DATA_KEY}`;
constEVENT_MOUSEOVER=`mouseover${EVENT_KEY}`;
constEVENT_MOUSEOUT=`mouseout${EVENT_KEY}`;
constEVENT_FOCUSIN=`focusin${EVENT_KEY}`;
constEVENT_FOCUSOUT=`focusout${EVENT_KEY}`;
constEVENT_HIDE=`hide${EVENT_KEY}`;
constEVENT_HIDDEN=`hidden${EVENT_KEY}`;
constEVENT_SHOW=`show${EVENT_KEY}`;
constEVENT_SHOWN=`shown${EVENT_KEY}`;
constCLASS_NAME_FADE='fade';
constCLASS_NAME_HIDE='hide';//@deprecated-kepthereonlyforbackwardscompatibility

constCLASS_NAME_SHOW='show';
constCLASS_NAME_SHOWING='showing';
constDefaultType={
animation:'boolean',
autohide:'boolean',
delay:'number'
};
constDefault={
animation:true,
autohide:true,
delay:5000
};
/**
*------------------------------------------------------------------------
*ClassDefinition
*------------------------------------------------------------------------
*/

classToastextendsBaseComponent{
constructor(element,config){
super(element);
this._config=this._getConfig(config);
this._timeout=null;
this._hasMouseInteraction=false;
this._hasKeyboardInteraction=false;

this._setListeners();
}//Getters


staticgetDefaultType(){
returnDefaultType;
}

staticgetDefault(){
returnDefault;
}

staticgetNAME(){
returnNAME;
}//Public


show(){
constshowEvent=EventHandler.trigger(this._element,EVENT_SHOW);

if(showEvent.defaultPrevented){
return;
}

this._clearTimeout();

if(this._config.animation){
this._element.classList.add(CLASS_NAME_FADE);
}

constcomplete=()=>{
this._element.classList.remove(CLASS_NAME_SHOWING);

EventHandler.trigger(this._element,EVENT_SHOWN);

this._maybeScheduleHide();
};

this._element.classList.remove(CLASS_NAME_HIDE);//@deprecated


reflow(this._element);

this._element.classList.add(CLASS_NAME_SHOW);

this._element.classList.add(CLASS_NAME_SHOWING);

this._queueCallback(complete,this._element,this._config.animation);
}

hide(){
if(!this._element.classList.contains(CLASS_NAME_SHOW)){
return;
}

consthideEvent=EventHandler.trigger(this._element,EVENT_HIDE);

if(hideEvent.defaultPrevented){
return;
}

constcomplete=()=>{
this._element.classList.add(CLASS_NAME_HIDE);//@deprecated


this._element.classList.remove(CLASS_NAME_SHOWING);

this._element.classList.remove(CLASS_NAME_SHOW);

EventHandler.trigger(this._element,EVENT_HIDDEN);
};

this._element.classList.add(CLASS_NAME_SHOWING);

this._queueCallback(complete,this._element,this._config.animation);
}

dispose(){
this._clearTimeout();

if(this._element.classList.contains(CLASS_NAME_SHOW)){
this._element.classList.remove(CLASS_NAME_SHOW);
}

super.dispose();
}//Private


_getConfig(config){
config={...Default,
...Manipulator.getDataAttributes(this._element),
...(typeofconfig==='object'&&config?config:{})
};
typeCheckConfig(NAME,config,this.constructor.DefaultType);
returnconfig;
}

_maybeScheduleHide(){
if(!this._config.autohide){
return;
}

if(this._hasMouseInteraction||this._hasKeyboardInteraction){
return;
}

this._timeout=setTimeout(()=>{
this.hide();
},this._config.delay);
}

_onInteraction(event,isInteracting){
switch(event.type){
case'mouseover':
case'mouseout':
this._hasMouseInteraction=isInteracting;
break;

case'focusin':
case'focusout':
this._hasKeyboardInteraction=isInteracting;
break;
}

if(isInteracting){
this._clearTimeout();

return;
}

constnextElement=event.relatedTarget;

if(this._element===nextElement||this._element.contains(nextElement)){
return;
}

this._maybeScheduleHide();
}

_setListeners(){
EventHandler.on(this._element,EVENT_MOUSEOVER,event=>this._onInteraction(event,true));
EventHandler.on(this._element,EVENT_MOUSEOUT,event=>this._onInteraction(event,false));
EventHandler.on(this._element,EVENT_FOCUSIN,event=>this._onInteraction(event,true));
EventHandler.on(this._element,EVENT_FOCUSOUT,event=>this._onInteraction(event,false));
}

_clearTimeout(){
clearTimeout(this._timeout);
this._timeout=null;
}//Static


staticjQueryInterface(config){
returnthis.each(function(){
constdata=Toast.getOrCreateInstance(this,config);

if(typeofconfig==='string'){
if(typeofdata[config]==='undefined'){
thrownewTypeError(`Nomethodnamed"${config}"`);
}

data[config](this);
}
});
}

}

enableDismissTrigger(Toast);
/**
*------------------------------------------------------------------------
*jQuery
*------------------------------------------------------------------------
*add.ToasttojQueryonlyifjQueryispresent
*/

defineJQueryPlugin(Toast);

/**
*--------------------------------------------------------------------------
*Bootstrap(v5.1.0):index.umd.js
*LicensedunderMIT(https://github.com/twbs/bootstrap/blob/main/LICENSE)
*--------------------------------------------------------------------------
*/
varindex_umd={
Alert,
Button,
Carousel,
Collapse,
Dropdown,
Modal,
Offcanvas,
Popover,
ScrollSpy,
Tab,
Toast,
Tooltip
};

returnindex_umd;

})));
//#sourceMappingURL=bootstrap.bundle.js.map
