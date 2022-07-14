import{_ as o,r as t,o as l,c as p,a as s,b as c,F as r,d as n,e as a}from"./app.498438af.js";const i={},d=n(`<h1 id="create-read-update-delete" tabindex="-1"><a class="header-anchor" href="#create-read-update-delete" aria-hidden="true">#</a> Create, Read, Update, Delete</h1><p>When you have your Collections defined, learn how to manipulate them!</p><h2 id="opening-isar" tabindex="-1"><a class="header-anchor" href="#opening-isar" aria-hidden="true">#</a> Opening Isar</h2><p>Before you can do anything, you have to open an Isar instance. Each instance needs a directory with write permission.</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> isar </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Isar</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">open</span><span style="color:#ABB2BF;">(</span></span>
<span class="line"><span style="color:#ABB2BF;">  schemas</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> [</span><span style="color:#E5C07B;">ContactSchema</span><span style="color:#ABB2BF;">],</span></span>
<span class="line"><span style="color:#ABB2BF;">  directory</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;some/directory&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span></code></pre></div><p>You can use the default config or provide some of the following parameters.</p><table><thead><tr><th>Config</th><th>Description</th></tr></thead><tbody><tr><td><code>name</code></td><td>You can open multiple instances with distinct names. By default, <code>&quot;isar&quot;</code> is used.</td></tr><tr><td><code>schemas</code></td><td>A list of all collection schemas you want to use. All instances need to use the same schemas.</td></tr><tr><td><code>directory</code></td><td>The storage location for this instance. You can pass a relative or absolute path. By default, <code>NSDocumentDirectory</code> is used for iOS and <code>getDataDirectory</code> for Android. The final location is <code>path/name</code>. Not required for web.</td></tr><tr><td><code>relaxedDurability</code></td><td>Relaxes the durability guarantee to increase write performance. In case of a system crash (not app crash), it is possible to lose the last committed transaction. Corruption is not possible</td></tr></tbody></table><p>You can either store the Isar instance in a global variable or use your favorite dependency injection package to manage it.</p><p>If an instance is already open, calling <code>Isar.open()</code> will yield the existing instance regardless of the specified parameters. That&#39;s useful for using isar in an isolate.</p>`,9),B={class:"custom-container tip"},y=s("p",{class:"custom-container-title"},"TIP",-1),h=a("Consider using the "),F={href:"https://pub.dev/packages/path_provider",target:"_blank",rel:"noopener noreferrer"},A=a("path_provider"),u=a(" package to get a valid path on all platforms."),f=n(`<h2 id="collections" tabindex="-1"><a class="header-anchor" href="#collections" aria-hidden="true">#</a> Collections</h2><p>The Collection object is how you find, query, and create new records of a given type.</p><h3 id="get-a-collection" tabindex="-1"><a class="header-anchor" href="#get-a-collection" aria-hidden="true">#</a> Get a collection</h3><p>All your collections live in the Isar instance. Remember the <code>Contact</code> class we annotated before with <code>@Collection()</code>. You can get the contacts collection with:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> contacts </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> isar.contacts;</span></span>
<span class="line"></span></code></pre></div><p>That was easy!</p><h3 id="get-a-record-by-id" tabindex="-1"><a class="header-anchor" href="#get-a-record-by-id" aria-hidden="true">#</a> Get a record (by id)</h3><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> contact </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#C678DD;">get</span><span style="color:#ABB2BF;">(someId);</span></span>
<span class="line"></span></code></pre></div><p><code>get()</code> returns a <code>Future</code>. All Isar operations are asynchronous by default. Most operations have a synchronous counterpart:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> contact </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#61AFEF;">getSync</span><span style="color:#ABB2BF;">(someId);</span></span>
<span class="line"></span></code></pre></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>It is recommended to use the asynchronous version of the method in your UI isolate. Since Isar is very fast, it is often fine to use the synchronous version.</p></div><h3 id="query-records" tabindex="-1"><a class="header-anchor" href="#query-records" aria-hidden="true">#</a> Query records</h3><p>Find a list of records matching given conditions using <code>.where()</code> and <code>.filter()</code>:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> allContacts </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#61AFEF;">where</span><span style="color:#ABB2BF;">().</span><span style="color:#61AFEF;">findAll</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> starredContacts </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">isStarredEqualTo</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">findAll</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"></span></code></pre></div><p>\u27A1\uFE0F Learn more: <a href="queries">Queries</a></p><h2 id="modifying-the-database" tabindex="-1"><a class="header-anchor" href="#modifying-the-database" aria-hidden="true">#</a> Modifying the database</h2><p>To create, update, or delete records, use the respective operations wrapped in a write transaction:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.</span><span style="color:#61AFEF;">writeTxn</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> contact </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#C678DD;">get</span><span style="color:#ABB2BF;">(someId)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  contact.isStarred </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(contact); </span><span style="color:#7F848E;font-style:italic;">// perform update operations</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contact.</span><span style="color:#61AFEF;">delete</span><span style="color:#ABB2BF;">(contact.id); </span><span style="color:#7F848E;font-style:italic;">// or delete operations</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span></code></pre></div><p>\u27A1\uFE0F Learn more: <a href="transactions">Transactions</a></p><h3 id="create-a-new-record" tabindex="-1"><a class="header-anchor" href="#create-a-new-record" aria-hidden="true">#</a> Create a new record</h3><p>When an object is not yet managed by Isar, you need to <code>.put()</code> it into a collection. If the id field is <code>null</code>, Isar will use an auto-increment id.</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> newContact </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Contact</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">  ..firstName </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;Albert&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">  ..lastName </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;Einstein&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">  ..isStarred </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.</span><span style="color:#61AFEF;">writeTxn</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(newContact);</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span>
<span class="line"></span></code></pre></div><p>Isar will automatically assign the new id to the object if the <code>id</code> field is not read-only.</p><h3 id="update-a-record" tabindex="-1"><a class="header-anchor" href="#update-a-record" aria-hidden="true">#</a> Update a record</h3><p>Both creating and updating works with <code>yourCollection.put(yourObject)</code>. If the id is null (or does not exist), the object is inserted, otherwise it is updated.</p><h3 id="delete-records" tabindex="-1"><a class="header-anchor" href="#delete-records" aria-hidden="true">#</a> Delete records</h3><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.</span><span style="color:#61AFEF;">writeTxn</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  contacts.</span><span style="color:#61AFEF;">delete</span><span style="color:#ABB2BF;">(contact.id);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span></code></pre></div><p>or:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.</span><span style="color:#61AFEF;">writeTxn</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> idsOfUnstarredContacts </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> contacts.</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#61AFEF;">isStarredEqualTo</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#61AFEF;">idProperty</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#61AFEF;">findAll</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  contacts.</span><span style="color:#61AFEF;">deleteAll</span><span style="color:#ABB2BF;">(idsOfUnstarredContacts);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span></code></pre></div>`,29);function D(g,C){const e=t("ExternalLinkIcon");return l(),p(r,null,[d,s("div",B,[y,s("p",null,[h,s("a",F,[A,c(e)]),u])]),f],64)}var b=o(i,[["render",D],["__file","crud.html.vue"]]);export{b as default};
