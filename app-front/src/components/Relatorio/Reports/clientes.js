import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";

function clientesPDF(clientes){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Clientes',
            fontSize: 24,
            bold: true,
            margin: [15,20,0,45] // left, top, right, bottom
        }
    ];

    const dados = clientes.map((cliente) => {
        return [
            {text: cliente.idCliente, fontSize: 9, margin: [0,2,0,2]}, 
            {text: cliente.nomeCliente, fontSize: 9, margin: [0,2,0,2]}, 
            {text: cliente.cpfCnpj,  fontSize: 9, margin: [0,2,0,2]}, 
            {text: cliente.celularCliente, fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const details = [
        {text: 'KENNEDY GATÃO', fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código', style: 'tableHeader', fontSize: 10}, {text: 'Nome', style: 'tableHeader', fontSize: 10}, 
                    {text: 'CPF / CNPJ', style: 'tableHeader', fontSize: 10}, {text: 'Telefone', style: 'tableHeader', fontSize: 10}],
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
    pdfMake.createPdf(docDefinitios).download();
}

export default clientesPDF;