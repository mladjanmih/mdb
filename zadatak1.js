//1.
db.knjizara.find(
  {
    cena: 
    { 
        $elemMatch: {
            $and: 
            [
                    {
                        iznos: { $gt: 200 }
                    },
                    {
                       drzava: "Srbija"
                    }
            ]
         }
    },
    zanr: "Roman"
  },
  {
      naslov: 1,
      autor: 1,
      brojStrana: 1,
      cena: 1,
      _id: 0
  }
)

//2.
db.knjizara.find(
    {
        godinaIzdanja: { $gte: 2000, $lte: 2005 }
    },
    {
        naslov: 1,
        godinaIzdanja: 1,
        _id: 0
    }
)
