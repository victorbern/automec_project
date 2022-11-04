import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from '../../../static/logo.jpg'

function comprovantePDF(comprovante){
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            image: logo,
            fit:[140,70]
        }
    ];

    const dados = comprovante.vendaDireta.map((produto) => {
        return [
            {text: produto.codigoBarras, fontSize: 9, margin: [0,2,0,2]}, 
            {text: produto.descricao, fontSize: 9, margin: [0,2,0,2]}, 
            {text: produto.precoUnitario,  fontSize: 9, margin: [0,2,0,2]},
            {text: produto.precoTotal,  fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const dados2 = comprovante.ordensServico.map((os) => {
        return [
            {text: os.idOrdemServico, fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.dataOS, fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.veiculo.placaVeiculo,  fontSize: 9, margin: [0,2,0,2]},
            {text: os.total,  fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const details = [
        {
            text: 'Comprovante | Total: '+comprovante.total,
            fontSize: 24,
            bold: true,
            margin: [0,0,0,20], // left, top, right, bottom
            alignment:'center'
        },
        {text: 'Data: '+ comprovante.dataHora, fontSize: 12, margin: [0, 20, 0, 8]},
        {text: 'Forma de pagamento: '+comprovante.formaPagamento, fontSize: 12, margin: [0, 20, 0, 8]},
        {text: 'Desconto: '+comprovante.desconto, fontSize: 12, margin: [0, 20, 0, 8]},
        {text: 'Venda Direta', fontSize: 12, bold: true, margin: [0, 20, 0, 8]},
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código de Barras', style: 'tableHeader', fontSize: 10}, {text: 'Descrição', style: 'tableHeader', fontSize: 10}, 
                    {text: 'Preço Unitário', style: 'tableHeader', fontSize: 10},
                    {text: 'Subtotal', style: 'tableHeader', fontSize: 10}], 
					...dados
				]
            },
            layout: 'lightHorizontalLines'
        },
        {text: 'Ordens de Serviço', fontSize: 12, bold: true, margin: [0, 20, 0, 8]},
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código', style: 'tableHeader', fontSize: 10}, {text: 'Data', style: 'tableHeader', fontSize: 10}, 
                    {text: 'Placa', style: 'tableHeader', fontSize: 10},
                    {text: 'Total', style: 'tableHeader', fontSize: 10}], 
					...dados2
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

export default comprovantePDF;