# Build-your-own-backend-Summer Reading List

Summer is on us at last! Time to catch up on some vitamin D and the giant pile of books you've been telling yourself you'd get to eventually. Don't have a giant pile calling your name (especially at the bookstore when you buy yet another book)? That's okay! Because the Summer Reading List provides a backend of the 30 most popular Sci-fi/Fantasy books (if that genre is your thing). So pull up comfy chair and get to reading.

\*\*Feel free to contribue by adding your own books that you want to read.

##API Calls

##Get

You can get data on several books with their authors, descriptions, total page length, and average list price.

##GET /api/v1/books

Sample Response
id:157,
title: The Lord Of The Rings Trilogy,
author: J.R.R. Tolkien,
description: 	Tolkien's seminal three-volume epic chronicles the War of the Ring, in which Frodo the hobbit and his companions set out to destroy the evil Ring of Power and restore peace to Middle-earth. The beloved trilogy still casts a long shadow, having established some of the most familiar and enduring tropes in fantasy literature.,
created_at: 2019-06-26 17:03:24.739759-06,	
updated_at: 2019-06-26 17:03:24.739759-06
id: 158,
title: The Hitchhiker's Guide To The Galaxy,
author: Douglas Adams,
description: In the first, hilarious volume of Adams' Hitchhiker's series, reluctant galactic traveler Arthur Dent gets swept up in some literally Earth-shattering events involving aliens, sperm whales, a depressed robot, mice who are more than they seem, and some really, really bad poetry.	
created_at: 2019-06-26 17:03:24.74631-06,	
updated_at: 2019-06-26 17:03:24.74631-06

id: 159,
title:	The Dune Chronicles,
author: Frank Herbert,
description:	Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.,
created_at:	2019-06-26 17:03:24.753956-06,
updated_at:	2019-06-26 17:03:24.753956-06


##GET /api/v1/additional

additional: {
id: 1,
pages: 216,
 list_price: 6.99}},
