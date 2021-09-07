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
      brojSrana: 1,
      cena: 1
  }
)
