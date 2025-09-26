interface IMakeVoteDTO {
  sessionId: string
  cpf: string
  vote: boolean
  agendaId?: string
}

export { IMakeVoteDTO }