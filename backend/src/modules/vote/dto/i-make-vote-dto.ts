interface IMakeVoteDTO {
  sessionId: string
  cpf: string
  vote: boolean
  agendaId?: string
  createdAt?: Date
}

export { IMakeVoteDTO }