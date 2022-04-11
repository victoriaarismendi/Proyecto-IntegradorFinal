let data = {
    usarios: {
        usuario: 'Delfina Galarza',
        email: 'dgalarzagraf@udesa.edu.ar',
        contrasenia: 'delfi',
        fechaDeNacimiento: 23/10/02,
        documento: 44504495,
        fotoDePerfil: '',
        
    }, 
    productos: [
        {
            id: 0, 
            producto: "Anillo Helix",
            precio: 790,
            material: "Acero",
            imagen:"/images/products/anilloHelix.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 1,
            producto: "Anillo Onix", 
            precio: 1100, 
            material: "Diamante", 
            imagen: "/images/products/anilloOnix.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 2, 
            producto: "Anillo Cuarzo", 
            precio: 800,
            material: "Oro",
            imagen: "/images/products/anilloCuarzo.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 3, 
            producto: "Collar Jade", 
            precio: 2500,
            material: "Plata",
            imagen: "/images/products/collarJade.jpg",
        
        },
        {
            id: 4, 
            producto: "Collar Amazonita",
            precio: 2000, 
            material: "Acero",
            imagen: "/images/products/collarAmazonita.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 5, 
            producto: "Collar Zafiro", 
            precio: 3000, 
            material: "Oro",
            imagen: "/images/products/collarZafiro.jpg",
       
        },
        {
            id: 6,
            producto: "Collar Obsidiana", 
            precio: 2300, 
            material: "Oro",
            imagen:"/images/products/collarObsidiana.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 7, 
            producto: "Collar Kiara",
            precio: 2000,
            material: "Oro",
            imagen: "/images/products/collarKiara.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 8,
            producto: "Aros Reika", 
            precio: 790, 
            material: "Plata",
            imagen: "/images/products/arosReika.jpg",
            fechaDeCarga: 01/04/33
 
        },
        {
            id: 9, 
            producto: "Aros Lumini",
            precio: 1000,
            material: "Oro",
            imagen: "/images/products/arosLumini.jpg",
            fechaDeCarga: 01/04/33

        },
        {
            id: 10, 
            producto: "Aros Howlita",
            precio: 1000,
            material: "Oro",
            imagen: "/images/products/arosHowlita.jpg",
            fechaDeCarga: 01/04/33
 
        },
        {
            id: 11, 
            producto: "Aros Rubi",
            precio: 900, 
            material: "Bronce",
            imagen: "/images/products/arosRubi.jpg",
            fechaDeCarga: 01/04/33

        },

        {
           banner: "/public/images/products/unnamed7.jpg"
        }
    ],
    comentarios: 
    [
        {
            usuario: "delfigalarza1",
            comentario1: "Muy bueno! El material es de increible calidad, se puden usuar en el agua y no se destiñen",
            fotoperfil: "/public/images/users/delfi.jpg"
        },
        {
            usuario: "vicuharismendi",
            comentario2: "Me encanta el color",
            fotoperfil: "/public/images/users/vicu.jpg",
        },
        {
            usuario: "antoniareynal",
            comentario3: "Lindo y ademas con gran servicio! El verdadero bueno, bonito y barato",
            fotoperfil: "/public/images/users/antonia.jpg",

        },
        {
            usuario: "luisabengolea",
            comentario4: "Muy recomendado! Me lo ponderaron mucho. Les pase su pagina a todas mis amigas.",
            fotoperfil: "/public/images/users/cusi.jpg",
        
        },
        {
            usuario: "isablaquier",
            comentario5: "Que lindo! si lo uso para meterme al agua, resiste el color?",
            fotoperfil: "/public/images/users/isa.jpg",
        }
        



    
    ]
}

module.exports = data;