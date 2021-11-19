/** 
 * Kopiera in koden från föregående uppgift "6-exercise"
 * 
 * Bygg vidare på inläggslistan
 * - Se till att varje inlägg endast visar sin rubrik, resten av inlägget skall vara dolt
 * - Rubriken skall vara en klickbar länk (som EJ laddar om sidan)
 * - När man trycker på en rubrik, då skall inläggets innehåll visas under rubriken. Trycker man igen, då döljs innehållet återigen.
 * - Extra (jQuery): Försök lägga till en animation som visar/döljer inläggsinnehållet på ett snyggt sätt. Ex slide up/slide down
 * 
 *
 */

 const main = document.querySelector('main'),
    liBlogPosts = document.getElementById('blog-posts'),
    liAuthor = document.getElementById('author'),
    liAbout = document.getElementById('about');

liBlogPosts.addEventListener('click', () => {
    addBlogPosts();
})

liAuthor.addEventListener('click', () => {
    addHeadlineAndText('Author');
})

liAbout.addEventListener('click', () => {
    addHeadlineAndText('About');
})
 
async function addHeadlineAndText(headlineString) {
    main.innerHTML = '';
    let h1 = document.createElement('h1'),
        p = document.createElement('p');

    main.append(h1, p);
    let object = await fetchObject();
    h1.innerText = headlineString;
    p.innerText = object[headlineString.toLowerCase()];
}

async function addBlogPosts() {
    main.innerHTML = '';
    let object = await fetchObject();

    for (let subObject of object.blog_posts) {
        let section = document.createElement('section'),
            h2 = document.createElement('h2'),
            iDate = document.createElement('i'),
            p = document.createElement('p'),
            sectionTags = document.createElement('section');

        section.style.display = 'none';
        main.append(h2, section);
        section.append(iDate, p, sectionTags);

        h2.innerText = subObject.title;
        iDate.innerText = subObject.date;
        p.innerText = subObject.text;
        sectionTags.innerText = `Tags: ${subObject.tags.map(tag => tag = ` ${tag}`)}`;
        h2.addEventListener('click', function() {
            if (section.style.display == 'none') $(this).next().slideDown();
            else $(this).next().slideUp();
        })
    }
}

async function fetchObject() {
    let response = await fetch('http://mardby.se/AJK15G/simple_json.php'),
        object = await response.json();
    return object;
}