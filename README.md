
 ## Diagrama de Classes

```mermaid
 classDiagram
    class DirectusUsers{
      +String id
      +String firstName
      +String lastName
      +String email
      +String password
    }
    class PessoaFisica{
      +String id
      +String nomeSocial
      +String nomeRegistro
      +DirectusUsers usuario
      +List~ContatoPessoaFisica~ contatos
    }
    PessoaFisica --> "0..1" DirectusUsers : usuario

    class ContatoPessoaFisica {
        +String id
        +PessoaFisica pessoaFisica
        +String nome
        +String telefone
        +String email
        +String site
        +integer sort
    }
    ContatoPessoaFisica "*" --> "1" PessoaFisica : pessoaFisica

    class Medico{
      +String id
      +PessoaFisica pessoaFisica
      +String crm
      +List~Especialidade~ especialidades
    }
    Medico --> "1" PessoaFisica : pessoaFisica
    Medico --> "0..*" Especialidade : especialidades

    class Paciente{
      +String id
      +PessoaFisica pessoaFisica
    }
    Paciente --> "1" PessoaFisica : pessoaFisica

    class Consulta{
      +String id
      +Medico medico
      +Paciente paciente
      +Timestamp inicio
      +Timestamp termino
      +String descricao
      +StatusConsulta status
    }
    Consulta --> "1" Medico : medico
    Consulta  --> "1" Paciente : paciente
    Consulta  --> "1" StatusConsulta : status

    class StatusConsulta {
      <<enumeration>>
      CANCELADA
      PLANEJADA
      REALIZADA
    }
    class Especialidade{
      +String id
      +String nome
    }

    class TipoEndereco {
      +String id
      +String nome
    }

    class Bairro {
      +String id
      +String nome
      +String codigoIbge
      +Cidade cidade
    }
    Bairro "*" --> "1" Cidade : cidade

    class Cidade {
      +String id
      +String nome
      +String codigoIbge
      +List~Bairro~ bairros
      +Estado estado
    }
    Cidade "*" --> "1" Estado : estado

    class Estado {
      +String id
      +String nome
      +String sigla
      +String codigoIbge
      +List~Cidade~ cidades
      +Pais pais
    }
    Estado "*" --> "1" Pais : pais

    class Pais {
      +String id
      +String nome
      +String sigla
      +Estados estados
      +String codigoM49
    }

    class EnderecoPessoaFisica{
      +String id
      +Pessoa pessoaFisica
      +String nome
      +Bairro bairro
      +String cep
      +String logradouro
      +String numero
      +String complemento
      +TipoEndereco tipoEndereco
    }
    EnderecoPessoaFisica "*" --> "1" PessoaFisica : pessoa
    EnderecoPessoaFisica --> "1" TipoEndereco : tipoEndereco
    EnderecoPessoaFisica --> "1" Bairro : bairro
