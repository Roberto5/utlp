function typeInAnimation(text,time,delay){
    var n,r='';
    if (!delay) delay=100;
    //Ttot:T=l:n 4000:500=4:n n=500*4/4000 =2000/4000 1/2 
    n=parseInt(time/delay)+1;
    if (n>=text.length) return text;
    for (var i=0;i<n;i++) 
    {
        r+=text.charAt(i);
    }
    return r;
}

function typeInAcronym(text,time,delay) {
    if (!delay) delay=100;
    if (!Array.isArray(text)) return "Error text isn't array";
    var n=0,l=0,r='';
    l=parseInt(time/delay)+1;
    for (var i=0;i<text.length;i++) {
        for (var j=0;(n<l && j<text[i].length)|| j==0;j++,n++)
            r+=text[i].charAt(j);
        if (n<=l) r+=' ';
    }
    r.substring(0, r.length-1);
    return r;
}