-- SEED DATA EXAMPLE
-- Este arquivo contém dados de exemplo para testar o sistema
-- Execute APÓS as migrations e criação de usuário

-- IMPORTANTE: Substitua o user_id pelo ID do seu usuário
-- Para descobrir seu user_id, execute: SELECT id FROM users WHERE email = 'seu_email@example.com';

-- Exemplo de animais
INSERT INTO animals (user_id, type, identification, breed, birth_date, gender, weight, health_status, notes) VALUES
(1, 'vaca', 'Vaca 001', 'Holandesa', '2020-03-15', 'femea', 450.50, 'saudavel', 'Vaca leiteira de alta produção'),
(1, 'vaca', 'Vaca 002', 'Jersey', '2019-08-20', 'femea', 380.00, 'saudavel', 'Excelente produtora de leite'),
(1, 'vaca', 'Vaca 003', 'Gir', '2021-01-10', 'femea', 420.00, 'saudavel', 'Animal jovem em crescimento'),
(1, 'porco', 'Porco A1', 'Duroc', '2022-06-05', 'macho', 180.00, 'saudavel', 'Porco de corte'),
(1, 'porco', 'Porco A2', 'Large White', '2022-07-12', 'femea', 165.00, 'saudavel', 'Matriz reprodutora');

-- Exemplo de registros de alimentação
INSERT INTO feeding_records (user_id, animal_id, date, feed_type, quantity, unit, cost, notes) VALUES
(1, 1, CURRENT_DATE - INTERVAL '1 day', 'Ração concentrada para gado leiteiro', 15.00, 'kg', 45.00, 'Alimentação matinal'),
(1, 2, CURRENT_DATE - INTERVAL '1 day', 'Ração concentrada para gado leiteiro', 12.00, 'kg', 36.00, 'Alimentação matinal'),
(1, 4, CURRENT_DATE - INTERVAL '1 day', 'Ração para suínos crescimento', 8.00, 'kg', 24.00, 'Ração balanceada'),
(1, 1, CURRENT_DATE, 'Ração concentrada para gado leiteiro', 15.00, 'kg', 45.00, 'Alimentação matinal'),
(1, 2, CURRENT_DATE, 'Ração concentrada para gado leiteiro', 12.00, 'kg', 36.00, 'Alimentação matinal');

-- Exemplo de estoque de alimentos
INSERT INTO feed_inventory (user_id, feed_name, quantity, unit, cost_per_unit, supplier, purchase_date, expiry_date, notes) VALUES
(1, 'Ração concentrada para gado leiteiro', 500.00, 'kg', 3.00, 'Agropecuária Silva', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '60 days', 'Saco de 50kg'),
(1, 'Ração para suínos crescimento', 300.00, 'kg', 3.50, 'Ração Premium Ltda', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE + INTERVAL '45 days', 'Estoque bom'),
(1, 'Feno de alfafa', 200.00, 'kg', 2.00, 'Fazenda do Vale', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '90 days', 'Qualidade excelente');

-- Exemplo de produção de esterco
INSERT INTO manure_production (user_id, date, quantity, unit, quality, storage_location, notes) VALUES
(1, CURRENT_DATE - INTERVAL '7 days', 150.00, 'kg', 'alta', 'Galpão 1', 'Esterco curtido - pronto para venda'),
(1, CURRENT_DATE - INTERVAL '5 days', 120.00, 'kg', 'alta', 'Galpão 1', 'Esterco bovino'),
(1, CURRENT_DATE - INTERVAL '3 days', 180.00, 'kg', 'media', 'Galpão 2', 'Esterco misto'),
(1, CURRENT_DATE - INTERVAL '1 day', 200.00, 'kg', 'alta', 'Galpão 1', 'Excelente qualidade');

-- Exemplo de vendas de esterco
INSERT INTO manure_sales (user_id, date, customer_name, customer_contact, quantity, unit, price_per_unit, total_amount, payment_status, notes) VALUES
(1, CURRENT_DATE - INTERVAL '6 days', 'Horta Orgânica Silva', '(11) 98765-4321', 100.00, 'kg', 2.50, 250.00, 'pago', 'Pagamento via PIX'),
(1, CURRENT_DATE - INTERVAL '4 days', 'Sítio Boa Vista', '(11) 97654-3210', 150.00, 'kg', 2.50, 375.00, 'pago', 'Cliente regular'),
(1, CURRENT_DATE - INTERVAL '2 days', 'Fazenda Verde', '(11) 96543-2109', 200.00, 'kg', 2.00, 400.00, 'pendente', 'Pagamento previsto para semana que vem'),
(1, CURRENT_DATE, 'Horta Comunitária', '(11) 95432-1098', 80.00, 'kg', 2.50, 200.00, 'pago', 'Entrega realizada hoje');

-- Exemplo de transações financeiras - RECEITAS
INSERT INTO financial_transactions (user_id, date, type, category, description, amount, payment_method, notes) VALUES
(1, CURRENT_DATE - INTERVAL '6 days', 'receita', 'Venda de Esterco', 'Venda para Horta Orgânica Silva', 250.00, 'pix', 'Primeira venda do mês'),
(1, CURRENT_DATE - INTERVAL '5 days', 'receita', 'Venda de Leite', 'Venda semanal de leite - Laticínio Central', 1500.00, 'transferencia', '500 litros @ R$ 3,00/litro'),
(1, CURRENT_DATE - INTERVAL '4 days', 'receita', 'Venda de Esterco', 'Venda para Sítio Boa Vista', 375.00, 'pix', 'Cliente regular'),
(1, CURRENT_DATE - INTERVAL '2 days', 'receita', 'Venda de Animal', 'Venda de bezerro', 2000.00, 'dinheiro', 'Bezerro desmamado'),
(1, CURRENT_DATE, 'receita', 'Venda de Esterco', 'Venda para Horta Comunitária', 200.00, 'pix', 'Venda rápida');

-- Exemplo de transações financeiras - DESPESAS
INSERT INTO financial_transactions (user_id, date, type, category, description, amount, payment_method, notes) VALUES
(1, CURRENT_DATE - INTERVAL '7 days', 'despesa', 'Alimentação', 'Compra de ração concentrada - 10 sacos', 450.00, 'transferencia', 'Agropecuária Silva'),
(1, CURRENT_DATE - INTERVAL '6 days', 'despesa', 'Medicamentos', 'Vacinas e vermífugos', 180.00, 'cartao', 'Veterinária São João'),
(1, CURRENT_DATE - INTERVAL '5 days', 'despesa', 'Manutenção', 'Conserto de cerca elétrica', 250.00, 'dinheiro', 'Serviços gerais'),
(1, CURRENT_DATE - INTERVAL '3 days', 'despesa', 'Alimentação', 'Compra de ração para suínos', 300.00, 'pix', 'Ração Premium Ltda'),
(1, CURRENT_DATE - INTERVAL '2 days', 'despesa', 'Energia', 'Conta de luz mensal', 420.00, 'transferencia', 'Companhia elétrica'),
(1, CURRENT_DATE - INTERVAL '1 day', 'despesa', 'Água', 'Conta de água mensal', 180.00, 'transferencia', 'Companhia de água'),
(1, CURRENT_DATE, 'despesa', 'Alimentação', 'Reposição de feno', 150.00, 'dinheiro', 'Fazenda do Vale');

-- Verificar os dados inseridos
SELECT 'Animais cadastrados:' as tipo, COUNT(*) as total FROM animals WHERE user_id = 1
UNION ALL
SELECT 'Registros de alimentação:', COUNT(*) FROM feeding_records WHERE user_id = 1
UNION ALL
SELECT 'Itens no estoque:', COUNT(*) FROM feed_inventory WHERE user_id = 1
UNION ALL
SELECT 'Produções de esterco:', COUNT(*) FROM manure_production WHERE user_id = 1
UNION ALL
SELECT 'Vendas de esterco:', COUNT(*) FROM manure_sales WHERE user_id = 1
UNION ALL
SELECT 'Transações financeiras:', COUNT(*) FROM financial_transactions WHERE user_id = 1;

-- Resumo financeiro
SELECT 
    'Resumo Financeiro:' as descricao,
    COALESCE(SUM(CASE WHEN type = 'receita' THEN amount ELSE 0 END), 0) as total_receitas,
    COALESCE(SUM(CASE WHEN type = 'despesa' THEN amount ELSE 0 END), 0) as total_despesas,
    COALESCE(SUM(CASE WHEN type = 'receita' THEN amount ELSE -amount END), 0) as saldo
FROM financial_transactions 
WHERE user_id = 1;

