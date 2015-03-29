/* 
The profile picture thumbnail DOM Element gets inserted into the DOM tree after some time asynchronously. 
So we need to parse the DOM tree frequently to check if it has been inserted. After it gets inserted,
we link the high resolution profile pic to the thumbnail.
*/

function getHighResolutionPicUrl()
{
/*
This function used to be interesting when the high resolution pic url could be pulled from CDN.   
Now we just figure out the profile id by parsing the page and make a call to the Graph api to fetch the 
high resolution profile pic.
*/
    var str = document.URL;
    var start=0;
    var slashCount = 0;
    var end=0;
    //Get the indices of the forward slashes
    for(var i=0; i<str.length;i++) 
    {
        if (str[i] === "/") 
        {
        	slashCount = slashCount + 1;
        	if (slashCount == 3)
        		start = i + 1;
        }
        if (str[i] === "?")
        	end = i;
    }	  
    
    if (end == 0)
    	    end = str.length;
    var newUrl = str.substring(start, end);
    finalPicUrl = "https://graph.facebook.com/" + newUrl + "/picture?width=2000&height=2000";
    return finalPicUrl;
}

function parseDom()
{	
	var pic = document.getElementsByClassName("profilePicThumb");
	if(pic.length!=0)
	{
		//if pic is not clickable then the profile pic is blocked
		if(!pic[0].hasOwnProperty('href'))
		{				
			var imgElement = document.getElementsByClassName("profilePic img");			
			bigImgSrc = getHighResolutionPicUrl();			
			var lightboxSet = document.getElementsByClassName("lightboxAnchor");
			if(lightboxSet.length==0) //set lightbox only if not set already
			{
				$(imgElement[0]).wrap('<a id="lightboxAnchor" href="' + bigImgSrc + '" data-lightbox="profilePicZoomed" data-title="Profile Picture UnBlocked"></a>');
			}		
		}
	}
}

var timeout = null;
timeout = setInterval(parseDom, 300);
