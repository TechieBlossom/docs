import{_ as s,d as a}from"./app.498438af.js";const n={},e=a(`<h1 id="watchers" tabindex="-1"><a class="header-anchor" href="#watchers" aria-hidden="true">#</a> Watchers</h1><p>Isar allows you to subscribe to changes in the database. You can either &quot;watch&quot; for changes in a specific object, an entire collection, or a query.</p><p>Watchers enable you to efficiently react to changes in the database. You can for example rebuild your UI when a contact is added, send a network request when a document is updated etc.</p><h2 id="watching-objects" tabindex="-1"><a class="header-anchor" href="#watching-objects" aria-hidden="true">#</a> Watching Objects</h2><p>If you want to be notified when a specific object is created, updated or deleted, you should watch an object:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#E5C07B;">Stream</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">&gt; userChanged </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">watchObject</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">userChanged.</span><span style="color:#61AFEF;">listen</span><span style="color:#ABB2BF;">((newUser) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;User changed: \${</span><span style="color:#E06C75;font-style:italic;">newUser</span><span style="color:#98C379;">?.</span><span style="color:#E06C75;font-style:italic;">name</span><span style="color:#98C379;">}&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> user </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">(id</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">)..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;David&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(user);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: User changed: David</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> user2 </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">(id</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">)..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;Mark&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(user);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: User changed: Mark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">delete</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: User changed: null</span></span>
<span class="line"></span></code></pre></div><p>As you can see in the example above, the object does not need to exist yet. The watcher will be notified when it is created.</p><p>There is an additional parameter <code>initialReturn</code>. If you set it to <code>true</code>, Isar will immediately add the current value of the object to the stream.</p><h3 id="lazy-watching" tabindex="-1"><a class="header-anchor" href="#lazy-watching" aria-hidden="true">#</a> Lazy watching</h3><p>Maybe you don&#39;t need to receive the new value but only be notified about the change. That saves Isar from having to fetch the object:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#E5C07B;">Stream</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#C678DD;">void</span><span style="color:#ABB2BF;">&gt; userChanged </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">watchObjectLazy</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">userChanged.</span><span style="color:#61AFEF;">listen</span><span style="color:#ABB2BF;">(() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;User 5 changed&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> user </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">(id</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">)..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;David&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(user);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: User 5 changed</span></span>
<span class="line"></span></code></pre></div><h2 id="watching-collections" tabindex="-1"><a class="header-anchor" href="#watching-collections" aria-hidden="true">#</a> Watching Collections</h2><p>Instead of watching a single object, you can watch an entire collection and get notified when any object is added, updated or deleted:</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#E5C07B;">Stream</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#C678DD;">void</span><span style="color:#ABB2BF;">&gt; userChanged </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">watchLazy</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">userChanged.</span><span style="color:#61AFEF;">listen</span><span style="color:#ABB2BF;">(() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;A User changed&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">final</span><span style="color:#ABB2BF;"> user </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">()..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;David&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(user);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: A User changed</span></span>
<span class="line"></span></code></pre></div><h2 id="watching-queries" tabindex="-1"><a class="header-anchor" href="#watching-queries" aria-hidden="true">#</a> Watching Queries</h2><p>It is even possible to watch entire queries. Isar does its best to only notify you when the query results actually change. You will however not be notified if links cause the query to change. Use a collection watcher if you need to be notified about that.</p><div class="language-dart ext-dart"><pre class="shiki" style="background-color:#282c34;"><code><span class="line"><span style="color:#E5C07B;">Query</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">&gt; usersWithA </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#61AFEF;">nameStartsWith</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;A&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    .</span><span style="color:#61AFEF;">build</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">Stream</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">List</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">&gt;&gt; queryChanged </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> usersWithA.</span><span style="color:#61AFEF;">watch</span><span style="color:#ABB2BF;">(initialReturn</span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">queryChanged.</span><span style="color:#61AFEF;">listen</span><span style="color:#ABB2BF;">((users) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;Users with A are: $</span><span style="color:#E06C75;font-style:italic;">users</span><span style="color:#98C379;">&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: Users with A are: []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">()..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;Albert&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: Users with A are: [User(name: Albert)]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">()..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;Monika&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// no print</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">awaited isar.users.</span><span style="color:#61AFEF;">put</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">User</span><span style="color:#ABB2BF;">()..name </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;Antonia&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// prints: Users with A are: [User(name: Albert), User(name: Antonia)]</span></span>
<span class="line"></span></code></pre></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>If you use offset &amp; limit or distinct queries, Isar will also notify you when objects matching the filter but outside the query results change.</p></div><p>Just like <code>watchObject()</code>, you can use <code>watchLazy()</code> to get notified when the query results change but not actually fetch the results.</p><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>Rerunning queries for every change is very inefficient. You should use a lazy collection watcher instead.</p></div>`,20);function l(p,o){return e}var c=s(n,[["render",l],["__file","watchers.html.vue"]]);export{c as default};
