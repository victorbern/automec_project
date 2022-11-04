import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from '../../../static/logo.jpg'

function produtosPDF(produtos){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            image: logo,
            fit:[140,70]
        }
    ];

    const dados = produtos.map((produto) => {
        return [
            {text: produto.codigoBarras, fontSize: 9, margin: [0,2,0,2]}, 
            {text: produto.descricao, fontSize: 9, margin: [0,2,0,2]}, 
            {text: produto.totalVendido,  fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const details = [
        {
            text: 'Produtos mais vendidos',
            fontSize: 24,
            bold: true,
            margin: [0,0,0,20], // left, top, right, bottom
            alignment:'center'
        },
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código de Barras', style: 'tableHeader', fontSize: 10}, {text: 'Descrição', style: 'tableHeader', fontSize: 10}, 
                    {text: 'Total Vendido', style: 'tableHeader', fontSize: 10}],
					...dados
				]
            },
            layout: 'lightHorizontalLines'
        }
    ];

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0,10,20,0] // left, top, right, bottom
            }
        ]
    };

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15,50,15,40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    };
    pdfMake.createPdf(docDefinitios).open({}, window.open('', '_blank'));
}

export default produtosPDF;